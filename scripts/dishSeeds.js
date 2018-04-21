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

const dishSeeds = [
  {
    name: "chicken shawarma",
    description: "chicken in pita bread wrap",
    category: "mediterranean",
    quantity: 10,
    price: 10,
    imgURL: 'https://www.recipetineats.com/wp-content/uploads/2014/12/Chicken-Shawarma_4.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "shrimp linguini",
    description: "noodle pasta with shrimp",
    category: "seafood",
    quantity: 5,
    price: 12,
    imgURL: 'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/20698-white-wine-garlic-shrimp-linguine-600x600.jpg?ext=.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "cheesecake",
    description: "strawberry cheesecake with fruits",
    category: "dessert",
    quantity: 5,
    price: 5,
    imgURL: 'http://www.ndtv.com/cooks/images/strawberry.cheesecake.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "mac n cheese",
    description: "plain mac n cheese - no more description required",
    category: "american",
    quantity: 10,
    price: 5,
    imgURL: 'https://www.recipetineats.com/wp-content/uploads/2017/03/Baked-Mac-N-Cheese_2.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "kung pao chicken",
    description: "diced chicken with tomatoes, zuchinni...",
    category: "chinese",
    quantity: 10,
    price: 5,
    imgURL: 'https://www.seriouseats.com/recipes/images/2014/05/20140513-takeout-kung-pao-chicken-peanuts-peppers-recipe-07.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "butter chicken",
    description: "chicken with sweet gravy",
    category: "indian",
    quantity: 7,
    price: 8,
    imgURL: 'https://i.ytimg.com/vi/a03U45jFxOI/maxresdefault.jpg',
    creator: '5adac5674e6167c10c362b67'
  },
  {
    name: "beef kebabs",
    description: "grilled kebabs with spicy sauce",
    category: "pakistani",
    quantity: 10,
    price: 5,
    imgURL: 'https://www.recipetineats.com/wp-content/uploads/2017/03/Baked-Mac-N-Cheese_2.jpg',
    creator: '5adac5674e6167c10c362b67'
  }
];

db.Dish
  .remove({})
  .then(() => db.Dish.collection.insertMany(dishSeeds))
  .then(data => {
    console.log(data.insertedCount + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });