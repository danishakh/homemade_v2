var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new DishSchema object
// This is similar to a Sequelize model
var DishSchema = new Schema({
  // `name` must be of type String
  name: {
  	type: String,
  	unique: true,
  	required: true
  },
  // `description` must be of type String
  description: {
  	type: String,
  	required: true
  },
  creator: {
      // Store ObjectId of User that added the dish
      type: Schema.Types.ObjectId,
      // The ObjectId will refer to the _id in User model
      ref: "User",
      required: true
  },
  imgURL: {
  	type: String
  },
  category: {
  	type: String,
    required: true
  },
  spiceLevel: {
  	type: String,
  	default: ''
  },
  dateAdded: {
  	type: Date,
  	default: Date.now
  },
  quantity: {
  	type: Number
  },
  price: {
  	type: Number,
  	required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Dish = mongoose.model("Dish", DishSchema);

// Export the Dish model
module.exports = Dish;
