const pool = require( "../database" );
const promisePool = pool.promise();

const controllers = {};

controllers.getAllCategories = async ( req, res ) => {

    try {
        let query = "SELECT * FROM category";
        
        const results = await promisePool.query( query );

        const categories = results[0];

        res.status( 200 ).send( categories );

    } catch (error) {

        console.log(error);
        res.status( 500 ).send( error );

    }

};

module.exports = controllers;