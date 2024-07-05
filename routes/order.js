const express = require("express");
const router = express.Router();
const { readAction } = require("../CRUD/actions");
const { insertOrder } = require("../actions/orderActions");
// require("../helpers/routeLock");
const { checkAuth } = require("../util/auth");
const { isName, isEmail } = require("../helpers/validate");

router.post("/", (req, res) => {
  let msn = ""
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const cart = req.body?.cart || false;
   if (!isName(name)) {
     res.status(500).json({ message: "Name is wrong. Make sure to enter first and last name only" });
     return ;
   } else if (!isEmail(email)) {
     res.status(500).json({ message: "Email is not valid" });
     return error;
   } else if (!isPassword(user.password)) {
     return error;
   }
  const ret = insertOrder(id, name, email, cart);
  ret.changes > 0
    ? res.status(201).json({ message: "Invoice created" })
    : res.status(500).json({ message: "An error has occurred" });
});
router.use(checkAuth);
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const ret = readAction("orders", "user_id = ?", [id]);
  if (ret) {
    res.status(200).json(ret);
  } else {
    res.status(404).json({ message: "No order found" });
  }
});

router.post("/detail", (req, res) => {
  const cart_id = req.body.cart_id;
  const user_id = req.body.user_id;
  const ret = readAction("cart", "creation_at = ? AND user_id = ?", [
    cart_id,
    user_id,
  ]);
  if (ret) {
    res.status(200).json(ret);
  } else {
    res.status(404).json({ message: "No product found" });
  }
});
module.exports = router;
