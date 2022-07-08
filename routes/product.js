const { Router } = require("express");
const router = Router();

const products = require("../controllers/product")

router.get("/", products.getAllProducts)

router.get("/:name", products.getProductsbyName)

module.exports = router;