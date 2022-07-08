const pool = require( "../database" );
const promisePool = pool.promise();

const controllers = {};

controllers.getAllProducts = async ( req, res ) => {

    try {
        
        const results = await promisePool.query( "SELECT * FROM product" );
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

        const config = {
            query: "SELECT * FROM product WHERE name LIKE ?",
            values: [ `%${name}%` ]
        };

        const results = await promisePool.query( config.query, config.values );
        const products = results[0];

        res.status( 200 ).send( products );

    } catch ( error ) {
        
        console.log( error );
        res.status( 500 ).send( error );

    }

};

module.exports = controllers;