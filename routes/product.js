const { Router } = require("express");
const router = Router();

const productControllers = require("../controllers/product");

/*
GET /api/v1/product retornará todos los productos.
Queries:
- sort: especifica el orden con que se quiere los productos.
- categories: especifica las categorias que se quiere que pertenezca los productos.
- priceRange: especifica los rangos de precios seleccionados para que pertenezcana los productos.
*/
router.get("/", productControllers.getAllProducts)


/*
GET /api/v1/product/:name retornará todos los productos que contengan el parametro "name" en su nombre.
Queries:
    - sort: especifica el orden con que se quiere los productos
    - categories: especifica las categorias que se quiere que pertenezca los productos.
    - priceRange: especifica los rangos de precios seleccionados para que pertenezcana los productos.
Params:
    - name: indica la palabra clave que debe contener los nombres de los productos que se buscan. 
*/
router.get("/:name", productControllers.getProductsbyName)

module.exports = router;