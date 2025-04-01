const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const { getInfoLog, getErrorLog } = require("./utils/logger");

const productRoutes = require("./routing/product");
const logoutRoutes = require("./routing/logout");
const killRoutes = require("./routing/kill");
const homeRoutes = require("./routing/home");

const { STATUS_CODE } = require("./constants/statusCode");
const { PORT } = require("./config");

const app = express();

// Парсинг тела формы
app.use(bodyParser.urlencoded({ extended: false }));

// Логгирование каждого запроса
app.use((req, res, next) => {
  console.log(getInfoLog(req));
  next();
});

// Роуты
app.use("/product", productRoutes);
app.use("/logout", logoutRoutes);
app.use("/kill", killRoutes);
app.use("/", homeRoutes);

// Обработка 404
app.use((req, res) => {
  console.warn(getErrorLog(new Error(`404 - ${req.url} not found`)));
  res.status(STATUS_CODE.NOT_FOUND);
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
