const express = require("express");
const { createAction, readAction, updateAction } = require("../CRUD/actions");
const router = express.Router();

//User Address===================================================

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const add = readAction("userAddress", "id = ?", [id]);
  if (add) {
    res.json(add);
  } else {
    res.json({ message: "not registered" });
  }
});

router.post("/", (req, res) => {
  let retCond;
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


router.patch("/", async (req, res) => {
  const address = req.body;
  const ret = updateAction(
    "userAddress",
    "line_one = ? , line_two = ? , town_city = ?,  constry_state = ?",
    "id = ?",
    [
      address.line_one,
      address.line_two,
      address.town_city,
      address.constry_state,
      address.id,
    ]
  );
  ret.changes > 0
    ? res.status(200).json({ message: `Updated address with id ${address.id}` })
    : res
        .status(404)
        .json({ message: `Could not update address with id ${address.id}` });
});



module.exports = router;
