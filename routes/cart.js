const express = require("express");
const { readAction, createAction, updateAction } = require("../CRUD/actions");
const {
  isProduct,
  rearranging,
  deleleteCart,
} = require("../actions/cartAction");
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
  const id = req.body.item.id + "";
  /*
 The block of code below would be unnecessary with a foreign key constraint in 
 the cart table. However, as the API will restore itself after each request made to 
 modify a product it was necessary to change the logic.
   */
  if (!isProduct(id)) {
    res.status(407).json({
      message: `There is no pruduct with id: ${id}`,
    });
    return;
  }

  const data = rearranging(req.body);
  createAction("cart", { ...data });
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

  ret?.changes
    ? res.status(200).json({ message: `Updated item with id ${item_id}` })
    : res.status(404).json({ message: `Not found` });
});

router.delete("/", async (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  let ret = deleleteCart(req.body.op, req.body.cart);

  ret?.changes
    ? res.status(200).json({
        message: `Deleted cart of user with id ${req.body.cart.user_id}`,
      })
    : res.status(404).json({
        message: `Not found`,
      });
});

module.exports = router;
