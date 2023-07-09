console.log(
  "This script will populate the db with a test brand and cars in that brand"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Car = require("./models/car");
const Brand = require("./models/brand");

const cars = [];
const brands = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
