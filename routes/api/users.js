const db = require("../../models");
const router = require("express").Router();
const usersController = require("../../controllers/usersController");


// Matches with "/api/users"
router.route("/")
  	.get(usersController.findAll)
  	.post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
	.get(usersController.findById)
  	.put(usersController.update)
 //  	{
	// 	"address":{
	// 		"street": "3605 Kariya Dr",
	// 		"city": "Toronto",
	// 		"state": "Ontario",			TO UPDATE ADDRESS, USE THIS ON POSTMAN
	// 		"zip": "L5N 8B1",
	// 		"country": "Canada"
	// 	}
	// }
  	.delete(usersController.remove);


module.exports = router;
