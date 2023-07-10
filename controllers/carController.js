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
    .escape()
    .withMessage("Car's name must be specified"),
  body("price")
    .trim()
    .custom((value) => {
      value = parseFloat(value);
      if (isNaN(value)) {
        return false;
      } else {
        value = value.toFixed(2);
        return true;
      }
    })
    .withMessage("Price field must be entered as a valid number"),
  body("description")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Description must be specified"),
  body("imageURL").trim().isLength({ min: 13 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const car = new Car({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageURL: req.body.imageURL,
      brand: req.params.brand,
    });

    if (!errors.isEmpty()) {
      res.render("car_form", {
        title: `Add a new brand`,
        car: car,
        errors: errors.array(),
      });
      return;
    } else {
      const carExists = await Car.findOne({ name: req.body.name }).exec();
      if (carExists) {
        res.redirect(carExists.url);
      } else {
        await car.save();
        await Brand.updateOne(
          { name: req.params.brand },
          { $push: { cars: car._id } }
        ).exec();
        res.redirect(car.url);
      }
    }
  }),
];

exports.car_detail = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id).exec();

  if (car === null) {
    res.redirect("/");
  }

  res.render("car_detail", {
    title: `You are currently viewing the ${req.params.name}`,
    car: car,
  });
});

exports.car_delete_get = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id).exec();

  if (car === null) res.redirect("/");

  res.render("car_delete", {
    car: car,
  });
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
  await Promise.all([
    Car.findByIdAndRemove(req.params.id),
    Brand.updateOne(
      { name: req.params.brand },
      { $pull: { cars: req.params.id } }
    ).exec(),
  ]);

  res.redirect(`/${req.params.brand}`);
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
  const car = await Car.findById(req.params.id).exec();

  if (car === null) {
    res.redirect(`/${req.params.brand}`);
  }

  res.render("car_form", {
    title: `Update ${car.name}'s information`,
    car: car,
  });
});

exports.car_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Car's name must be specified"),
  body("price")
    .trim()
    .custom((value) => {
      value = parseFloat(value);
      if (isNaN(value)) {
        return false;
      } else {
        value = value.toFixed(2);
        return true;
      }
    })
    .withMessage("Price field must be entered as a valid number"),
  body("description")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Description must be specified"),
  body("imageURL").trim().isLength({ min: 13 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const car = new Car({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageURL: req.body.imageURL,
      brand: req.params.brand,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("car_form", {
        title: `Add a new brand`,
        car: car,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedCar = await Car.findByIdAndUpdate(
        req.params.id,
        car,
        {}
      ).exec();
      res.redirect(updatedCar.url);
    }
  }),
];
