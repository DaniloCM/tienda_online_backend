const pool = require( "../database" );
const promisePool = pool.promise();

const productHelpers = require("../helpers/product");

const controllers = {};


controllers.getAllProducts = async ( req, res ) => {

    try {

        let query = "SELECT * FROM product";

        query += productHelpers.sqlOrderBy(req.query.sort);
        
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

        console.log("getProductsbyName", req.query);

        const config = {
            query: "SELECT * FROM product WHERE name LIKE ?",
            values: [ `%${name}%` ]
        };

        config.query += productHelpers.sqlOrderBy(req.query.sort);

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

        const config = {
            query: "SELECT * FROM product WHERE category=?",
            values: [ id ]
        };

        config.query += productHelpers.sqlOrderBy(req.query.sort);

        const results = await promisePool.query( config.query, config.values );

        const products = results[0];

        res.status( 200 ).send( products );

    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).send( error );

    }

};

module.exports = controllers;