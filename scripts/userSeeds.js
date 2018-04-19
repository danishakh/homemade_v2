const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/homemade"//,
  // {
  //   useMongoClient: true
  // }
);

const userSeeds = [
  {
    name: "George Yoooo",
    email: "souljaboy@yolo.com",
    password: "george12",
    dishes: ["5ad6864118b59a84adda36e4", "5ad6864118b59a84adda36e5"]
  },
  {
    name: "Jayson Phillips",
    email: "jjp@gmail.com",
    password: "jayson12",
    dishes: ["5ad6864118b59a84adda36e6", "5ad6864118b59a84adda36e7"]
  },
  {
    name: "Coop Man",
    email: "coopacabana@gmail.com",
    password: "coop12"
  },
  {
    name: "Travis Scott",
    email: "tscott@gmail.com",
    password: "travis12",
    dishes: ["5ad6864118b59a84adda36e8"]
  },
  {
    name: "Peter Parker",
    email: "spiderman@avengers.com",
    password: "auntmay12",
    dishes: ["5ad6864118b59a84adda36e9"]
  },
  {
    name: "Tony Stark",
    email: "richboy@tonystark.com",
    password: "pepper12",
    dishes: ["5ad6864118b59a84adda36ea"]
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeeds))
  .then(data => {
    console.log(data.insertedCount + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
