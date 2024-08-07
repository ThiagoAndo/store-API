const express = require("express");
const { createAction, readAction, updateAction } = require("../CRUD/actions");
const router = express.Router();
const { checkAuth } = require("../util/auth");
const { isValid } = require("../util/inputCheck");

// require("../helpers/routeLock");
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!isValid(null, id)) {
    res.status(407).json({
      message: `There is no user with id: ${id}`,
    });
    return;
  }
  const add = readAction("userAddress", "id = ?", [id]);
  if (add.length > 0) {
    res.status(200).json(add);
  } else {
    res.status(404).json({ message: "not registered" });
  }
});
router.use(checkAuth);
router.post("/", (req, res) => {
    const id = req.body.id;
    if (!isValid(null, id)) {
      res.status(407).json({
        message: `There is no user with id: ${id}`,
      });
      return;
    }
    const add = readAction("userAddress", "id = ?", [id]);
    if (add.length === 0) {
      const ret = createAction("userAddress", { ...req.body });
      res.status(201).json({ message: "Address created successufuly" });
      return;
    } else {
      res.status(500).json({ message: "Already registered" });
      return;
    }
});
router.patch("/", async (req, res) => {
  const address = req.body;
    const id = req.body.id;
    if (!isValid(null, id)) {
      res.status(407).json({
        message: `There is no user with id: ${id}`,
      });
      return;
    }
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
      ? res
          .status(201)
          .json({ message: `Updated address with id ${address.id}` })
      : res
          .status(404)
          .json({ message: `Could not update address with id ${address.id}` });
});
module.exports = router;
