const express = require("express");
const { readAction } = require("../CRUD/actions");
const router = express.Router();
const { insertOrder } = require("../actions/orderActions");
require("../helpers/routeLock");

router.get("/:id", (req, res) => {
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }
  const id = req.params.id;
  const add = readAction("orders", "user_id = ?", [id]);
  if (add) {
    res.status(200).json(add);
  } else {
    res.status(404).json({ message: "No order found" });
  }
});

router.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const ret = insertOrder(id, name, email);
  if (!allowAccess) {
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
    return;
  }

  ret.changes > 0
    ? res.status(201).json({ message: "Invoice created" })
    : res.status(500).json({ message: "An error has occurred" });
});

module.exports = router;
