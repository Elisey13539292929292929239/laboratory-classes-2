const { getInfoLog, getErrorLog, getProcessLog } = require("../utils/logger");
const { homeRouting } = require("./home");
const { productRouting } = require("./product");
const { logoutRouting } = require("./logout");
const { STATUS_CODE } = require("../constants/statusCode");

const requestRouting = (request, response) => {
  const { url, method } = request;

  // Лог запроса
  console.log(getInfoLog(request));

  if (url === "/") {
    return homeRouting(method, response);
  }

  if (url.includes("/product")) {
    return productRouting(request, response);
  }

  if (url === "/logout") {
    return logoutRouting(method, response);
  }

  if (url === "/kill") {
    // Лог процесса
    console.log(getProcessLog("logout"));
    process.exit();
  }

  response.statusCode = STATUS_CODE.NOT_FOUND;
  response.setHeader("Content-Type", "text/html");
  response.write("<html><body><h1>404 - Not Found</h1></body></html>");
  response.end();

  // Лог ошибки
  console.warn(getErrorLog(new Error(`requested url ${url} doesn't exist`)));
};

module.exports = { requestRouting };
