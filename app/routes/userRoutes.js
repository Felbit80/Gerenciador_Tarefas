const express = require("express");
<<<<<<< Updated upstream
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
=======
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
router.get("/createTask", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/createTask.html"));
  });
>>>>>>> Stashed changes

module.exports = router;