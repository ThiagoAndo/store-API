const express = require("express");
const router = express.Router();
const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { readAction } = require("../CRUD/actions");

router.get("/", async (req, res) => {
  const products = readAction("products", "id != ?", ["-1"]);
  const images = readAction("images", "item_id != ?", ["-1"]);

  res.status(200).json({ products, images });
});

router.get("/categories", async (req, res) => {
  const ret = db
    .prepare(
      `SELECT DISTINCT category FROM products`
    )
    .all();
  res.status(200).json(ret);
});
module.exports = router;

router.get("/bycategorie", async (req, res) => {
  const { category } = req.query;

  const products = readAction("products", "category = ? OR category = ?", [
    "mens-shoes"," womens-tops"
  ]);

  res.status(200).json(products);
});
module.exports = router;
//