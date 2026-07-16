const fsPromises = require("fs").promises;
const path = require("path");

const getTimestamp = (date) => {
  const d_year = 1900 + parseInt(date.getYear());
  const d_month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const d_day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const d_time_h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const d_time_m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const d_time_s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${d_day}.${d_month}.${d_year} ${d_time_h}:${d_time_h}:${d_time_s}`;
};

const logger = async (req, res, next) => {
  const log_date = getTimestamp(new Date(Date.now()));
  const log_method = req.method;
  const log_url = req.url;
  const log_url_orig = req.originalUrl;
  const log_body = req.body;
  const log_params = req.params;
  const logString = `${log_date} : ${log_method} ${log_url} ${log_url_orig}`;
  console.log(logString);
  try {
    await fsPromises.appendFile(path.join(__dirname, "..", "log", "log.txt"), `${logString}\n`);
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = logger;