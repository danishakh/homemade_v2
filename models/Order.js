var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new DishSchema object
// This is similar to a Sequelize model
var OrderSchema = new Schema({
  
  dishes:[
    {
      product: {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Dish"
      },
      orderQty: {
        type: Number
      }
    }
  ],
  total: {
    type: Number
  },
  orderCreated: {
    type: Date,
    default: Date.now
  },
  orderUser: {
      // Store ObjectId of User that added the dish
      type: Schema.Types.ObjectId,
      // The ObjectId will refer to the _id in User model
      ref: "User",
      required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Order = mongoose.model("Order", OrderSchema);

// Export the Dish model
module.exports = Order;
