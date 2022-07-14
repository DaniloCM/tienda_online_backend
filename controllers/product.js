const pool = require( "../database" );
const promisePool = pool.promise();

const sqlHelpers = require("../helpers/sql");

const controllers = {};

// Obtiene la informacion de los productos en la base de datos, si hay queries string de los filtros se le agrega las condiciones a la consulta y esta se ordena según se especifique. Se devuelve un array con objetos con la información de los productos.
controllers.getAllProducts = async ( req, res ) => {

    try {
        const { categories, priceRange, sort } = req.query;

        let query = "SELECT * FROM product";

        if(priceRange || categories) query += " WHERE ";

        if (priceRange) query += sqlHelpers.priceRangeFilter(priceRange);
        if(priceRange && categories) query += " AND ";
        if (categories) query += sqlHelpers.categoryFilter(categories);

        query += sqlHelpers.orderBy(sort);

        const results = await promisePool.query( query );

        const products = results[0];

        res.status( 200 ).send( products );

    } catch (error) {

        console.log(error);
        res.status( 500 ).send( error );

    }

};


// Obtiene la informacion de los productos que coincidan en parte con la palabra clave en la base de datos, si hay queries string de los filtros se le agrega las condiciones a la consulta y esta se ordena según se especifique. Se devuelve un array con objetos con la información de los productos.
controllers.getProductsbyName = async (req, res) => {

    try {
        const { name } = req.params;

        const { categories, priceRange, sort } = req.query;

        const config = {
            query: "SELECT * FROM product WHERE (name LIKE ?)",
            values: [ `%${name}%` ]
        };

        if (priceRange) {
            config.query += " AND " + sqlHelpers.priceRangeFilter(priceRange);
        }

        if (categories) {
            config.query += " AND " + sqlHelpers.categoryFilter(categories);
        }
        config.query += sqlHelpers.orderBy(sort);

        const results = await promisePool.query( config.query, config.values );

        const products = results[0];

        res.status( 200 ).send( products );

    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).send( error );

    }

};

module.exports = controllers;