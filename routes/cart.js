const express = require("express");
const { deleteAction, readAction } = require("../CRUD/actions");
const { checkInsertCart } = require("../actions/cartActions");
const router = express.Router();
require("../helpers/routeLock");


router.get("/:id", async (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  const user_id = req.params.id;
  const items = readAction("cart", "user_id=? AND bought=?", [user_id, 0]);
  items.length > 0
    ? res.status(200).json({ items })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  const { items, id: user_id } = req.body;
  let ret;
  if (items.length === 0) {
    ret = deleteAction("cart", " user_id = ? AND bought = ?", [user_id, 0]);
    ret.changes > 0
      ? res.status(200).json({ message: "Cart deleted" })
      : res.status(500).json({ message: "An error has occurred" });
  } else {
    items.forEach((item) => {
      const {
        id: item_id,
        quantity: qnt,
        createAt: creation_at,
        price,
        name,
      } = item;
      ret = checkInsertCart({
        user_id,
        item_id,
        qnt,
        creation_at,
        name,
        price,
      });
    });
    res.status(201).json({ message: "Cart created successufuly" });
  }
});

module.exports = router;
