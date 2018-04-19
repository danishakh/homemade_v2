const router = require("express").Router();
const userRoutes = require("./users");
const dishRoutes = require("./dishes");
const orderRoutes = require("./orders")

// User routes
router.use("/users", userRoutes);
router.use("/dishes", dishRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
