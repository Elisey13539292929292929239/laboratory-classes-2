const express = require("express");
const path = require("path");
const fs = require("fs");
const { STATUS_CODE } = require("../constants/statusCode");
const renderNewProductPage = require("../views/renderNewProductPage");

const router = express.Router();

// GET /product/add — показать форму добавления
router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "add-product.html"));
});

// POST /product/add — сохранить продукт и сделать редирект
router.post("/add", (req, res) => {
  const { name, description } = req.body;

  const content = `Name: ${name}, Description: ${description}`;

  fs.writeFile("product.txt", content, (err) => {
    if (err) {
      console.error("Ошибка при записи product.txt:", err);
    }

    res.status(STATUS_CODE.FOUND);
    res.redirect("/product/new");
  });
});

// GET /product/new — прочитать продукт и отдать HTML
router.get("/new", (req, res) => {
  fs.readFile("product.txt", "utf-8", (err, data) => {
    const productData = !err && data
      ? data.split(",").map((d) => d.trim()).join(" | ")
      : null;

    const html = renderNewProductPage(productData);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

module.exports = router;
