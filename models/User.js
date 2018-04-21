const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  // `name` must be unique and of type String
  name: {
    type: String,
    required: "Name is required!"
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    required: [true, "Email is required!"],
    unique: true
  },
  points: {
    type: Number,
    default: 5
  },
  imgURL: {
    type: String,
    default: ""
  },
  address: {
    street: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    zip: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    }
  },
  googleID: {
    type: String,
    default: ""
  },
  facebookID: {
    type: String,
    default: ""
  },
  userCreated: {
      type: Date,
      default: Date.now
  },
  // `dishes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Dish model
  // This allows us to populate the User with any associated Dishes
  dishes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Dish"
    }
  ],
  shoppingCart:   {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Dish model
      ref: "Dish",
      quantity: Number,
      price: Number
    }
});


// /**
//  * Compare the passed password with the value in the database. A model method.
//  *
//  * @param {string} password
//  * @returns {object} callback
//  */
// UserSchema.methods.comparePassword = function comparePassword(password, callback) {
//   bcrypt.compare(password, this.password, callback);
// };


// /**
//  * The pre-save hook method.
//  */
// UserSchema.pre('save', function saveHook(next) {
//   const user = this;

//   // proceed further only if the password is modified or the user is new
//   if (!user.isModified('password')) return next();


//   return bcrypt.genSalt((saltError, salt) => {
//     if (saltError) { return next(saltError); }

//     return bcrypt.hash(user.password, salt, (hashError, hash) => {
//       if (hashError) { return next(hashError); }

//       // replace a password string with hash value
//       user.password = hash;

//       return next();
//     });
//   });
// });


// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;
