import axios from "axios";

const join = async (joinData, success, fail) => {
  await axios
    .post(`http://192.168.31.206:3025/api/farm-service/join`, joinData)
    .then(success)
    .catch(fail);
};

export { join };
