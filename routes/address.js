const express = require("express");
const { createAction, readAction } = require("../CRUD/actions");
const router = express.Router();

//User Address===================================================

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const add = readAction("userAddress", [id]);
  if (add) {
    res.json(add);
  } else {
    res.json({ message: "not registered" });
  }
});

router.post("/", (req, res) => {
  const id = req.params.id;
//   const add = readAction("userAddress", [id]);
//   if (add === undefined) {
//     const ret = createAction("userAddress", { id, ...req.body });
//     res.status(201).json(ret);
//   } else {
//     res.status(500).json("Already registered");
//   }
});

module.exports = router;
