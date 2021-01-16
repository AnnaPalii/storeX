const router = require("express").Router();
const commentRoutes = require("./comments");
const bookingRoutes = require("./bookings");
const userRoutes = require("./user");

// comments routes
router.use("/comments", commentRoutes);

// bookings routes
router.use("/booking", bookingRoutes);

// user routes
router.use("/user", userRoutes);

module.exports = router;
