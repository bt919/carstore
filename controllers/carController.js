const Brand = require("../models/brand");
const Car = require("../models/car");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.car_create_get = asyncHandler(async (req, res, next) => {
  res.render("car_form", { title: `Add a new ${req.params.brand} car` });
});

exports.car_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("This field is required")
    .escape(),
  body("price")
    .trim()
    .isNumeric()
    .withMessage("Must be a number")
    .custom((value) => {
      value = parseFloat(value);
      if (isNaN(value)) {
        throw new Error("Price must be a number");
      } else {
        value = value.toFixed(2);
      }
    }),
  body("description").trim().escape(),
  body("imageURL").trim().isLength({ min: 13 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const car = new Car({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageURL: req.body.imageURL,
    });

    if (!errors.isEmpty()) {
      res.render("car_form", {
        title: `Add a new ${req.body.name}`,
        car: car,
      });
    } else {
      const carExists = await Car.findOne({ name: req.body.name }).exec();
      if (carExists) {
        res.redirect(carExists.url);
      } else {
        await car.save();
        res.redirect(car.url);
      }
    }
  }),
];

exports.car_detail = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "car detail" });
});

exports.car_delete_get = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "delete a car" });
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "delete a car" });
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "update a car" });
});

exports.car_update_post = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "update a car" });
});
