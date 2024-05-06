const express = require("express");
const router = express.Router();
const { newUser, getUser } = require("../actions/userActions");
const { deleteAction, updateAction } = require("../CRUD/actions");

router.get("/:email/:password", async (req, res) => {
  const user = await getUser({
    email: req.params.email,
    password: req.params.password,
  });

  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const ret = await newUser(data);
  console.log(ret);
  res.status(201).json(ret);
});

router.patch("/", async (req, res) => {
  const user = req.body;
  const ret = updateAction("users", "password = ?", "id = ?", [
    user.password,
    user.id,
  ]);
  ret.changes > 0
    ? res.status(200).json({ message: `Updated user with id ${user.id}` })
    : res
        .status(404)
        .json({ message: `Could not update user with id ${user.id}` });
});

router.delete("/", async (req, res) => {
  const user = req.body;
  deleteAction("orders", "user_id = ?", [user.id]);
  deleteAction("cart", "user_id = ?", [user.id]);
  deleteAction("userAddress", "id = ?", [user.id]);
  const ret = deleteAction("users", "id = ?", [user.id]);
  ret.changes > 0
    ? res.status(200).json({ message: `Deleted user with id ${user.id}` })
    : res
        .status(404)
        .json({ message: `Could not delete user with id ${user.id}` });
});

module.exports = router;
