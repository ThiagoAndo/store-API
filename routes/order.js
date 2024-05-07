const express = require("express");
const { readAction } = require("../CRUD/actions");
const router = express.Router();
const { insertOrder } = require("../actions/orderActions");

require("../helpers/routeLock");

router.get("/:id", (req, res) => {
  if (!allowAccess)
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
  const id = req.params.id;
  const add = readAction("orders", "id = ?", [id]);
  if (add) {
    res.status(200).json(add);
  } else {
    res.status(404).json({ message: "No order found" });
  }
});

router.post("/", (req, res) => {
  const id = req.body.id;
  const ret = insertOrder(id);
  // if (!allowAccess)
  //   res.status(407).json({
  //     message: "Client must first authenticate itself with the proxy.",
  //   });

  res.status(200).json(ret);
});

module.exports = router;
