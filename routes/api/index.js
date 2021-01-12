const router = require("express").Router();
// const commentRoutes = require("./comments");
const userRoutes = require("./user");
const subscriptionRoutes = require("./subscriptions");

// comments routes
// router.use("/comments", commentRoutes);
router.use("/subscriptions", subscriptionRoutes);
// user routes
router.use("/user", userRoutes);

module.exports = router;
