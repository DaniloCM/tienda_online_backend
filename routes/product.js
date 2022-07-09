const { Router } = require("express");
const router = Router();

const productControllers = require("../controllers/product");

router.get("/", productControllers.getAllProducts)

router.get("/:name", productControllers.getProductsbyName)

router.get("/category/:id", productControllers.getProductsbyCategory)

module.exports = router;