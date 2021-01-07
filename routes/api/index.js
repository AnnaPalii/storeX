const router = require("express").Router();
const intakeRoutes = require("./intake");
const userRoutes = require("./user");

// comments routes
router.use("/intake", intakeRoutes);
// user routes
router.use("/user", userRoutes);

module.exports = router;
