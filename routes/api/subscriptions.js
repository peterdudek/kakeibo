const router = require("express").Router();
const subscriptionsController = require("../../controllers/subscriptionsController");

// Matches with "/api/comments"
router.route("/")
  .get(subscriptionsController.findAll)
  .post(subscriptionsController.create);

// Matches with "/api/comments/:id"
router
  .route("/:id")
  .get(subscriptionsController.findById)
  .put(subscriptionsController.update)
  .delete(subscriptionsController.remove);

module.exports = router;