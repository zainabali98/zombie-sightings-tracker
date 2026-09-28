const router = require("express").Router();
const { isAdmin } = require("../middleware/is-signed-in");

router.get("/", (req, res) => {
  res.render("homepage.ejs");
});

router.get("/admin", isAdmin, (req, res) => {
  res.render("admin.ejs");
});

module.exports = router;