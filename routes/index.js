const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", exports.index);

/* GET request for creating a new brand */
router.get("/create", exports.brand_create_get);

/* POST request for creating a new brand */
router.post("/create", exports.brand_create_post);

/* GET request for a brand */
router.get("/:brand", exports.brand_detail);

/* GET request for deleting a brand */
router.get("/:brand/delete", exports.brand_delete_get);

/* POST request for deleting a brand */
router.post("/:brand/delete", exports.brand_delete_post);

/* GET request for creating a car */
router.get("/:brand/create", exports.car_create_get);

/* POST request for creating a car */
router.post("/:brand/create", exports.car_create_post);

/* GET request for showing a car's detail */
router.get("/:brand/:name/:id", exports.car_detail);

/* GET request for deleting a car */
router.get("/:brand/:name/:id/delete", exports.car_delete_get);

/* POST request for deleting a car */
router.post("/:brand/:name/:id/delete", exports.car_delete_post);

/* GET request for updating a car */
router.get("/:brand/:name/:id/update", exports.car_update_get);

/* POST request for updating a car */
router.post("/:brand/:name/:id/update", exports.car_update_post);

module.exports = router;
