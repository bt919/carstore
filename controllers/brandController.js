const Brand = require("../models/brand");
const Car = require("../models/car");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const brands = await Brand.find({}).sort({ brand: 1 }).exec();

  res.render("index", { title: "check" });
});

exports.brand_create_get = asyncHandler(async (req, res, next) => {});

exports.brand_create_post = asyncHandler(async (req, res, next) => {});

exports.brand_detail = asyncHandler(async (req, res, next) => {});

exports.brand_delete_get = asyncHandler(async (req, res, next) => {});

exports.brand_delete_post = asyncHandler(async (req, res, next) => {});
