import axios from "axios";

const login = async (loginData, success, fail) => {
  await axios.post().then(success).catch(fail);
};

export { login };
