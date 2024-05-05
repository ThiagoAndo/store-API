const express = require("express");
const router = express.Router();
const { newUser, getUser } = require("../actions/userActions");
const { createAction, deleteAction, readAction } = require("../CRUD/actions");

router.get("/:email/:password", async (req, res) => {
  const user = await getUser({
    email: req.params.email,
    password: req.params.password,
  });
  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const ret = newUser(data);
  console.log(ret);
  res.status(201).json(ret);
});

router.delete("/", async (req, res) => {
  const data = req.body;

  deleteAction;
  const ret = newUser(data);
  console.log(ret);
  res.status(201).json(ret);
});

module.exports = router;
