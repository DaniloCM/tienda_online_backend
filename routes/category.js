const { Router } = require("express");
const router = Router();

const categoryControllers = require("../controllers/category.js");


// GET /api/v1/category retornará todas las categorías
router.get("/", categoryControllers.getAllCategories);

module.exports = router;