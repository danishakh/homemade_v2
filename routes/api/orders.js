const db = require("../../models");
const router = require("express").Router();
const ordersController = require("../../controllers/ordersController");


// Matches with "/api/dishes"
router
	.route("/")
  		.get(ordersController.findAll)
  		.post(ordersController.create);

// Matches with "/api/dishes/:id"
router
  	.route("/:id")
  		.get(ordersController.findById)
  //.put(ordersController.update)
  //.delete(ordersController.remove);

router
	.route("/user/:id")
	.get(ordersController.findByUserId);

module.exports = router;
