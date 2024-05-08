import axios from "axios";

const getHourlyData = async (success, fail) => {
  await axios
    .get(`http://192.168.31.206:3024/api/state-service/hourly`)
    .then(success)
    .catch(fail);
};

const getDailyData = async (success, fail) => {
  await axios
    .get(`http://192.168.31.206:3024/api/state-service/daily`)
    .then(success)
    .catch(fail);
};

export { getHourlyData, getDailyData };
