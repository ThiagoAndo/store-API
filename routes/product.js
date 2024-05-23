const express = require("express");
const router = express.Router();
const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { readAction,createAction } = require("../CRUD/actions");

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
  let queryLen = Array(category.length).fill("category = ?");
  queryLen = queryLen.toString().replaceAll(",", " OR ");
  const products = readAction("products", `${queryLen}`, category);
  res.status(200).json(products);
});


router.post("/", (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }

  const product = req.body;

  
  if (add.length === 0) {
    const ret = createAction("products", { ...req.body });

    if (ret.changes > 0) res.status(201).json(ret);
  } else {
    res.status(500).json("Already registered");
  }
});

module.exports = router;
//