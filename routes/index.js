const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Browse the brands we offer" });
});

/* GET brnad page. */
router.get("/:id", function (req, res, next) {
  res.render("brand", { title: `Browse through our ${id} cars` });
});

module.exports = router;
