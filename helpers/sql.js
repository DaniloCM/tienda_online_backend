let helpers = {};

helpers.orderBy = (sort) => {

    let query = "";

    if (sort) {
        
        if(sort === "az") query = " ORDER BY name ASC";
        if(sort === "za") query = " ORDER BY name DESC";
        if(sort === "asc") query = " ORDER BY (price * ( 1 - (discount / 100))) ASC";
        if(sort === "desc") query = " ORDER BY (price * ( 1 - (discount / 100))) DESC";

    }

    return query;

}

helpers.priceRangeFilter = (priceRange) => {
    priceRange = priceRange.split(",").map((e) => e === "true");
    
    priceRange = priceRange.map( (isChecked, index) => {
        if (isChecked){
            if (index === 0) return "((price * ( 1 - (discount / 100))) BETWEEN 0 AND 1499)";
            if (index === 1) return "((price * ( 1 - (discount / 100))) BETWEEN 1500 AND 5000)";
            if (index === 2) return "((price * ( 1 - (discount / 100))) > 5000)";
        }

        return "";
    });
    // console.log({priceRange});

    for (let i = 0; i < priceRange.length; i++) {
        
        if (priceRange[i] === "") {
            priceRange.splice(i, 1)
            i--;
        }
        
    }
    // console.log({priceRange});

    let query = "(" + priceRange.join(" OR ") + ")";
    // console.log({query});

    return query;

}

helpers.categoryFilter = (categories) => {
    categories = categories.split(",").map((e) => Number(e));
    
    categories = categories.map( (categoryId, index) => {
        return `(category = ${categoryId})`;
    });
    // console.log({categories});

    let query = "(" + categories.join(" OR ") + ")";
    // console.log({query});

    return query;

}

module.exports = helpers;