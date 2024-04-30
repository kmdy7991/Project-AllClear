import axios from "axios";

const login = async (loginData, success, fail) => {
  await axios
    .post(`http://192.168.31.206:3022/api/farm-service/login`, loginData)
    .then(success)
    .catch(fail);
};

export { login };
