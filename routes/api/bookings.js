const router = require("express").Router();
const bookingsController = require("../../controllers/commentsController");

// Matches with "/api/bookings"
router.route("/")
  .get(bookingsController.findAll)
  .post(bookingsController.create);

// Matches with "/api/bookings/:id"
router
  .route("/:id")
  .get(bookingsController.findById)
  .put(bookingsController.update)
  .delete(bookingsController.remove);

module.exports = router;