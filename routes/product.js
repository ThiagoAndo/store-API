const { readAction } = require("../CRUD/actions");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = readAction("products", "id != ?", ["-1"]);
  const images = readAction("images", "item_id != ?", ["-1"]);

  res.json({ products, images });
});
module.exports = router;
