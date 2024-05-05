const express = require("express");

const { createAction, deleteAction, readAction } = require("../CRUD/actions");

const {
  newUser,
  getUser,
  getUserAdd,
  add,
  replace,
  remove,
} = require("../actions/userActions");

const { getAllProducts } = require("../actions/productActions");
const { checkInsertCart } = require("../actions/cartActions");
const { getImages } = require("../actions/imageActions");
const {
  isValidText,
  isValidDate,
  isValidImageUrl,
} = require("../util/validation");

const router = express.Router();


//User Address===================================================

router.get("/add/:id", (req, res) => {
  console.log(req.params.id);

  const add = getUserAdd(req.params.id);
  if (add) {
    res.json(add);
  } else {
    res.json({ message: "not registered" });
  }
});

router.post("/add/:id", (req, res) => {
  const add = getUserAdd(req.params.id);
  const id = req.params.id;

  if (add === undefined) {
    const ret = createAction("userAddress", { id, ...req.body });
    res.status(201).json(ret);
  } else {
    res.status(500).json("Already registered");
  }
});

//Cart Routes===================================================
router.get("/cart/:id", async (req, res) => {
  const user_id = req.params.id;
  const items = readAction("cart", "user_id=? AND bought=?", [
    req.params.id,
    0,
  ]);

  res.json({ items });
});

router.post("/cart", async (req, res) => {
  const { items, id: user_id } = req.body;

  if (items.length === 0) {
    deleteAction("cart", " user_id = ? AND bought = ?", [user_id, 0]);
    res.status(200).json({ message: "Cart deleted" });
  } else {
    items.forEach((item) => {
      const {
        id: item_id,
        quantity: qnt,
        createAt: creation_at,
        price,
        name,
      } = item;
      checkInsertCart({ user_id, item_id, qnt, creation_at, name, price });
    });
  }

  res.status(200).json({ message: "Cart created successufuly" });
});

module.exports = router;
