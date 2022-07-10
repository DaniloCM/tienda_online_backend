const pool = require( "../database" );
const promisePool = pool.promise();

const sqlHelpers = require("../helpers/sql");

const controllers = {};


controllers.getAllProducts = async ( req, res ) => {

    try {
        const { priceRange, sort } = req.query;

        let query = "SELECT * FROM product";

        if (priceRange) {
            query += " WHERE " + sqlHelpers.priceRangeFilter(priceRange);
        }
        query += sqlHelpers.orderBy(sort);
        
        const results = await promisePool.query( query );

        const products = results[0];

        res.status( 200 ).send( products );

    } catch (error) {

        console.log(error);
        res.status( 500 ).send( error );

    }

};

controllers.getProductsbyName = async (req, res) => {

    try {
        const { name } = req.params;

        const { priceRange, sort } = req.query;

        console.log("getProductsbyName", req.query);

        const config = {
            query: "SELECT * FROM product WHERE (name LIKE ?)",
            values: [ `%${name}%` ]
        };

        if (priceRange) {
            config.query += " AND " + sqlHelpers.priceRangeFilter(priceRange);
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

controllers.getProductsbyCategory = async (req, res) => {

    try {
        
        const { id } = req.params;
        const { priceRange, sort } = req.query;

        const config = {
            query: "SELECT * FROM product WHERE category=?",
            values: [ id ]
        };

        if (priceRange) {
            config.query += "AND" + sqlHelpers.priceRangeFilter(priceRange);
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