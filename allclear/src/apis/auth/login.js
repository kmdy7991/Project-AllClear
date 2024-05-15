import axios from "axios";

const login = async (loginData, success, fail) => {
  await axios
    .post(`http://192.168.35.123:3024/api/farm-service/login`, loginData)
    // .post(`http://192.168.219.92:3024/api/farm-service/login`, loginData)
    .then(success)
    .catch(fail);
};

export { login };
