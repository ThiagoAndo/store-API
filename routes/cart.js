const express = require("express");
const {
  deleteAction,
  readAction,
  createAction,
  updateAction,
} = require("../CRUD/actions");
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

  const { item, id: user_id } = req.body;
  let ret;
  const {
    id: item_id,
    name,
    price,
    quantity,
    createAt: creation_at,
  } = item;

  ret = createAction("cart", {
    user_id,
    item_id,
    qnt:quantity,
    bought: 0,
    price,
    name,
    creation_at,
  });
  res.status(201).json({ message: "Cart created successufuly" });
});

router.patch("/", async (req, res) => {
  const { qnt, item_id, user_id } = req.body.cart;
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  ret = updateAction("cart", "qnt = ?", "item_id = ? AND user_id=? ", [
    qnt,
    item_id,
    user_id,
  ]);

  ret.changes > 0
    ? res.status(200).json({ message: `Updated item with id ${item_id}` })
    : res
        .status(404)
        .json({ message: `Could not update item with id ${item_id}` });
});

router.delete("/", async (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  let ret;
  switch (req.body.op) {
    case 0:
      ret = deleteAction("cart", "user_id=?", [req.body.cart]);
      break;
    case 1:
      ret = deleteAction("cart", "item_id = ? AND user_id=?", [
        req.body.cart.item_id,
        req.body.cart.user_id,
      ]);
      break;
    default:
      console.log("Something went wrong on switch delete cart");
  }

  console.log(ret);
  ret.changes > 0
    ? res.status(200).json({
        message: `Deleted cart of user with id ${req.body.cart.user_id}`,
      })
    : res.status(404).json({
        message: `Could not delete cart of user with id ${req.body.cart.user_id}`,
      });
});

module.exports = router;
