import axios from "axios";

const getHourlyData = async (success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30204/hourly`)
    .then(success)
    .catch(fail);
};

const getDailyData = async (success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30204/daily`)
    .then(success)
    .catch(fail);
};

const getLineData = async (lineNumber, success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30207line/${lineNumber}`)
    .then(success)
    .catch(fail);
};

export { getHourlyData, getDailyData, getLineData };
