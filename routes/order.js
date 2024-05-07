const express = require("express");
const { readAction } = require("../CRUD/actions");
const router = express.Router();
require("../helpers/routeLock");

router.get("/:id", (req, res) => {
  if (!allowAccess)
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
  const id = req.params.id;
  const add = readAction("userAddress", "id = ?", [id]);
  if (add) {
    res.json(add);
  } else {
    res.json({ message: "not registered" });
  }
});

router.post("/", (req, res) => {
  if (!allowAccess)
    res.status(407).json({
      message: "Client must first authenticate itself with the proxy.",
    });
  const id = req.body.id;
  const add = readAction("userAddress", "id = ?", [id]);
  console.log(add);
  if (add.length === 0) {
    const ret = createAction("userAddress", { ...req.body });
    if (ret.changes > 0) res.status(201).json(ret);
  } else {
    res.status(500).json("Already registered");
  }
});
