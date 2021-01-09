const router = require("express").Router();
const subscriptionController = require("../../controllers/subscriptionController");

// Matches with "/api/comments"
router.route("/")
  .get(subscriptionController.findAll)
  .post(subscriptionController.create);

// Matches with "/api/comments/:id"
router
  .route("/:id")
  .get(subscriptionController.findById)
  .put(subscriptionController.update)
  .delete(subscriptionController.remove);

module.exports = router;