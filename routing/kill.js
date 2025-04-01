const express = require("express");
const { getProcessLog } = require("../utils/logger");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(getProcessLog("Kill route"));
  res.send("🛑 Server will now shut down...");
  process.exit(); // Завершает Node.js процесс
});

module.exports = router;
