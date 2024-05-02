import { useEffect, useState, useCallback, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

function Monitoring() {
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const videoContainerRef = useRef(null); // DOM에 접근하기 위한 ref

  const OPENVIDU_SERVER_URL = import.meta.env.VITE_OPENVIDU_API_URL;
  const OPENVIDU_SERVER_SECRET = "ssafy";

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  const joinSession = useCallback(() => {
    if (!OV) {
      const ov = new OpenVidu();
      setOV(ov);
      setSession(ov.initSession());
    }
  }, [OV]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
      // 언로드를 방지하는 메시지를 추가할 수 있습니다 (브라우저에 따라 다를 수 있음)
      // event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  useEffect(() => {
    if (session) {
      session.on("streamCreated", (event) => {
        const subscriber = session.subscribe(event.stream, `my-video`);
        subscriber.on("videoElementCreated", (event) => {
          videoContainerRef.current.appendChild(event.element);
        });
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      session.on("streamDestroyed", (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter(
            (sub) => sub.stream.streamId !== event.stream.streamId
          )
        );
      });
    }
  }, [session]);

  useEffect(() => {
    if (session && OV) {
      const fetchData = async () => {
        try {
          const token = await getToken();
          await session.connect(token);
          const publisher = OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: false,
            publishVideo: true,
            mirror: true,
          });
          session.publish(publisher);
          setPublisher(publisher);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [session, OV]);

  const createSession = async (sessionId) => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
        JSON.stringify({ customSessionId: sessionId }),
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.id;
    } catch (error) {
      if (error.response?.status === 409) {
        return sessionId;
      }
      console.error("Error creating session:", error.message);
      return null;
    }
  };

  const createToken = async (sessionId) => {
    try {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.token;
    } catch (error) {
      console.error("Error creating token:", error.message);
      return null;
    }
  };

  const getToken = async () => {
    const sessionIdValue = await createSession(sessionId || "defaultSessionId");
    if (sessionIdValue) {
      return createToken(sessionIdValue);
    }
    throw new Error("Failed to create session or token.");
  };

  useEffect(() => {
    joinSession();
  }, []);

  return (
    <div id="my-video" ref={videoContainerRef}>
      <div>스마트팜 실시간 CCTV 화면</div>
      {subscribers.map((sub, index) => (
        <div key={index}>CCTV 화면 {index + 1}</div>
      ))}
    </div>
  );
}

export default Monitoring;
