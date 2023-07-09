const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const car_controller = require("../controllers/carController");

/* GET home page. */
router.get("/", brand_controller.index);

/* GET request for creating a new brand */
router.get("/create", brand_controller.brand_create_get);

/* POST request for creating a new brand */
router.post("/create", brand_controller.brand_create_post);

/* GET request for a brand */
router.get("/:brand", brand_controller.brand_detail);

/* GET request for deleting a brand */
router.get("/:brand/delete", brand_controller.brand_delete_get);

/* POST request for deleting a brand */
router.post("/:brand/delete", brand_controller.brand_delete_post);

/* GET request for creating a car */
router.get("/:brand/create", car_controller.car_create_get);

/* POST request for creating a car */
router.post("/:brand/create", car_controller.car_create_post);

/* GET request for showing a car's detail */
router.get("/:brand/:name/:id", car_controller.car_detail);

/* GET request for deleting a car */
router.get("/:brand/:name/:id/delete", car_controller.car_delete_get);

/* POST request for deleting a car */
router.post("/:brand/:name/:id/delete", car_controller.car_delete_post);

/* GET request for updating a car */
router.get("/:brand/:name/:id/update", car_controller.car_update_get);

/* POST request for updating a car */
router.post("/:brand/:name/:id/update", car_controller.car_update_post);

module.exports = router;
