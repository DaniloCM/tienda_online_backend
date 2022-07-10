const { Router } = require("express");
const router = Router();

const categoryControllers = require("../controllers/category.js");

router.get("/", categoryControllers.getAllCategories);

module.exports = router;