const router = require("express").Router();
const userRoutes = require("./user");
const subscriptionRoutes = require("./subscriptions");
const showRoutes = require("./shows");

// subscription routes
router.use("/subscriptions", subscriptionRoutes);
// user routes
router.use("/user", userRoutes);
// show routes
router.use("/shows", showRoutes);

module.exports = router;
