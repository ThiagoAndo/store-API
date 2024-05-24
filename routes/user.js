const express = require("express");
const router = express.Router();
const pkg = require("bcryptjs");
const { hash } = pkg;
const { newUser, getUser } = require("../actions/userActions");
const { deleteAction, updateAction } = require("../CRUD/actions");
const { checkAuth } = require("../util/auth");
// require("../helpers/routeLock");

router.post("/get", async (req, res) => {
  const user = await getUser({
    email: req.body.email,
    password: req.body.password,
  });
  if (user?.message) {
    switch (user.message[0]) {
      case "W":
        res.status(401).json(user);
        break;
      case "C":
        res.status(404).json(user);
        break;
    }
    return;
  }
  res.status(200).json(user);
});
router.post("/new", async (req, res) => {
  const data = req.body;
  const ret = await newUser(data);
  if (ret?.message) {
    res.status(401).json(ret);
  } else {
    res.status(201).json(ret);
  }
});
router.use(checkAuth);
router.patch("/", async (req, res) => {
  const user = req.body;
  user.password = await hash(user.password, 12);
  const ret = updateAction("users", "password = ?", "id = ?", [
    user.password,
    user.id,
  ]);
  ret.changes > 0
    ? res.status(200).json({ message: `Updated user with id ${user.id}` })
    : res
        .status(404).json({ message: `Could not update user with id ${user.id}` });
});
router.delete("/", async (req, res) => {
  const user = req.body;
  deleteAction("orders", "user_id = ?", [user.id]);
  deleteAction("cart", "user_id = ?", [user.id]);
  deleteAction("userAddress", "id = ?", [user.id]);
  const ret = deleteAction("users", "id = ?", [user.id]);
  ret.changes > 0
    ? res.status(200).json({ message: `Deleted user with id ${user.id}` })
    : res.status(404).json({ message: `Could not delete user with id ${user.id}` });
});
module.exports = router;
