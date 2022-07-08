const { Router } = require("express");
const router = Router();

const products = require("../controllers/product")

router.get("/", products.allProducts)

module.exports = router;