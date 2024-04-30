import { useEffect, useState, useCallback } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_API_URL;
const OPENVIDU_SERVER_SECRET = "SSAFY";

function Monitoring() {
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [subscriber, setSubscriber] = useState(null);
  const [publisher, setPublisher] = useState(null);

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession("");
    setSessionId("");
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);

  const sessionIdChangeHandler = (event) => {
    setSessionId(event.target.value);
  };

  useEffect(() => {
    if (session === "") return;

    session.on("streamDestroyed", (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (session === "") return;

    session.on("streamCreated", (event) => {
      const subscribers = session.subscribe(event.stream, "");
      setSubscriber(subscribers);
    });

    const createSession = async (sessionIds) => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data.id;
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return sessionIds;
        }

        return "";
      }
    };

    const createToken = (sessionIds) => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            resolve(response.data.token);
          })
          .catch((error) => reject(error));
      });
    };

    const getToken = async () => {
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        return token;
      } catch (error) {
        throw new Error("Failed to get token.");
      }
    };

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                mirror: true,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  return <div>Monitoring</div>;
}

export default Monitoring;
