const Brand = require("../models/brand");
const Car = require("../models/car");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.car_create_get = asyncHandler(async (req, res, next) => {});

exports.car_create_post = asyncHandler(async (req, res, next) => {});

exports.car_detail = asyncHandler(async (req, res, next) => {});

exports.car_delete_get = asyncHandler(async (req, res, next) => {});

exports.car_delete_post = asyncHandler(async (req, res, next) => {});

exports.car_update_get = asyncHandler(async (req, res, next) => {});

exports.car_update_post = asyncHandler(async (req, res, next) => {});
