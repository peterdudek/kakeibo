const router = require("express").Router();
const showsController = require("../../controllers/showsController");

// Matches with "/api/subscriptions"
router.route("/shows")
  .get(showsController.findAll)
  // .post(subscriptionsController.create);


module.exports = router;