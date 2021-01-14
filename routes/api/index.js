const router = require("express").Router();
const userRoutes = require("./user");
const subscriptionRoutes = require("./subscriptions");

// subscription routes
router.use("/subscriptions", subscriptionRoutes);
// user routes
router.use("/user", userRoutes);

module.exports = router;
