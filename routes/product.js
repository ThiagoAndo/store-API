const express = require("express");
const router = express.Router();
const sql = require("better-sqlite3");
const db = sql("e-comerce.db");
const { readAction, deleteAction } = require("../CRUD/actions");
const { insertP } = require("../actions/productActions");
const { products } = require("../data/productsData");
router.get("/", async (req, res) => {
  const products = readAction("products", "id != ?", ["-1"]);
  const images = readAction("images", "item_id != ?", ["-1"]);
  res.status(200).json({ products, images });
});

router.get("/categories", async (req, res) => {
  const ret = db.prepare(`SELECT DISTINCT category FROM products`).all();
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

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const products = readAction("products", "id = ?", [id]);
  const images = readAction("images", "item_id = ?", [id]);

  products?.length
    ? res.status(200).json({ products, images })
    : res
        .status(404)
        .json({ message: `Could not found product with id: ${id}` });
});

router.post("/", (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  const ret = insertP([req.body]);
  ret?.message
    ? res.status(400).json(ret)
    : res.status(201).json({ message: "Product created" });
});

router.delete("/:id", async (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  
  deleteAction("images", "item_id=?", [req.params.id]);
  let ret = deleteAction("products", "id=?", [req.params.id]);
  ret.changes > 0
    ? res.status(200).json({
        message: `Deleted product id ${req.params.id}`,
      })
    : res.status(404).json({
        message: `Could not delete product id ${req.params.id}`,
      });
});

module.exports = router;
//
