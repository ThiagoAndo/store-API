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

  const add = readAction(req.params.id);
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

module.exports = router;
