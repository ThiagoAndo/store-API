const express = require("express");
const router = express.Router();

router.get("/doc", (req, res) => {
  res.render("index.html");
});


module.exports = router;
