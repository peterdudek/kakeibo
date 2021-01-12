const router = require("express").Router();
//const commentRoutes = require("./comments");
const subscriptionRoutes = require("./subscriptions");
const userRoutes = require("./user");

// comments routes
// router.use("/comments", commentRoutes);
router.use("/subscriptions", subscriptionRoutes);
// user routes
router.use("/user", userRoutes);

module.exports = router;
