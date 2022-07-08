const pool = require( "../database" );

const controllers = {};

controllers.allProducts = async ( req, res ) => {

    try {
        
        const results = await pool.promise().query( "SELECT * FROM product" );
        const products = results[0];
        res.status( 200 ).send( products );

    } catch (error) {

        console.log(error);
        res.status( 500 ).send( error );

    }

};

module.exports = controllers;