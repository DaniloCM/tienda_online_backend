let helpers = {};

helpers.sqlOrderBy = (sort) => {

    let query = "";

    if (sort) {
        
        if(sort === "az") query = " ORDER BY name ASC";
        if(sort === "za") query = " ORDER BY name DESC";
        if(sort === "asc") query = " ORDER BY (price * ( 1 - (discount / 100))) ASC";
        if(sort === "desc") query = " ORDER BY (price * ( 1 - (discount / 100))) DESC";

    }

    return query;

}

module.exports = helpers;