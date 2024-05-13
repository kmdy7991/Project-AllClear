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

const getLineData = async (lineNumber, success, fail) => {
  await axios
    .get(`http://1.1.1.1:1111/api/state-service/line/${lineNumber}`)
    .then(success)
    .catch(fail);
};

const getTreeData = async (success, fail) => {
  await axios
    .get(`http://1.1.1.1:1111/api/state-service/tree`)
    .then(success)
    .catch(fail);
};

export { getHourlyData, getDailyData, getLineData, getTreeData };
