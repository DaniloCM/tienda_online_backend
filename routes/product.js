const { Router } = require("express");
const router = Router();

const products = require("../controllers/product")

router.get("/", products.getAllProducts)

router.get("/:name", products.getProductsbyName)

router.get("/category/:id", products.getProductsbyCategory)

module.exports = router;