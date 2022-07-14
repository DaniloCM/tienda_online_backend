let helpers = {};

// Según una palabra que se obtiene de la query string 'sort' se crea una cláusula ORDER BY de SQL, si no hay query string o no coincide la palabra  con ninguna definida, se devuelve un string vacio
// helpers.orderBy(sort: string): string
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


// Según un array que indica los rangos de precios seleccionados, se crea una condición para ocuparla en el WHERE de la consulta, indicando los rangos de precios ya con descuentos.
// helpers.priceRangeFilter(priceRange: array): string
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

    for (let i = 0; i < priceRange.length; i++) {
        
        if (priceRange[i] === "") {
            priceRange.splice(i, 1)
            i--;
        }
        
    }

    let query = "(" + priceRange.join(" OR ") + ")";

    return query;

}


// Según un array que indica las categorias seleccionadas, se crea una condición para ocuparla en el WHERE de la consulta, indicando los id de las categorias.
// helpers.categoryFilter(categories: array): string
helpers.categoryFilter = (categories) => {
    categories = categories.split(",").map((e) => Number(e));
    
    categories = categories.map( (categoryId, index) => {
        return `(category = ${categoryId})`;
    });

    let query = "(" + categories.join(" OR ") + ")";

    return query;

}

module.exports = helpers;