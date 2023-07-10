const Brand = require("../models/brand");
const Car = require("../models/car");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({}).sort({ name: 1 }).exec();

  res.render("index", {
    title: "Browse through our brands",
    brand_list: brands,
  });
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {
  res.render("brand_form", { title: "Add a new brand" });
});

exports.brand_create_post = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified"),
  body("logoURL").trim().isLength({ min: 13 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({
      name: req.body.name,
      logoURL: req.body.logoURL,
    });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Add a new brand",
        brand: brand,
        errors: errors.array(),
      });
    } else {
      const brandExists = await Brand.findOne({ name: req.body.name }).exec();

      if (brandExists) {
        res.redirect(brandExists.url);
      } else {
        await brand.save();
        res.redirect(brand.url);
      }
    }
  }),
];

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findOne({ name: req.params.brand })
    .populate("cars")
    .exec();

  if (brand === null) {
    res.redirect("/");
  }

  res.render("brand_detail", { cars_list: brand.cars, name: brand.name });
});

exports.brand_delete_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findOne({ name: req.params.brand })
    .populate("cars")
    .exec();

  if (brand === null) res.redirect("/");

  res.render("brand_delete", {
    name: brand.name,
    cars_list: brand.cars,
  });
});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findOne({ name: req.params.brand }).exec();

  if (brand.cars.length > 0) {
    res.render("brand_delete", {
      name: brand.name,
      brands_list: brand.cars,
    });
  } else {
    await Brand.findByIdAndRemove(brand._id);
    res.redirect("/");
  }
});
