# Prueba técnica: Desafío Bsale Producto

La prueba consiste en realizar una tienda online que despliegue los productos agrupados por categorías que pertenecen.

Este repositorio corresponde a la parte backend del proyecto, específicamente a la API REST que consume el frontend.

La API REST tiene dos endpoint principales

* Ruta para consultar las categorías: `GET /api/v1/category`
* Ruta para consultar los productos: `GET /api/v1/product`

## Categoría

En este endpoint es posible listar todas las categorías que tienen los productos. Solo se puede consumir.

### Estructura JSON

Al realizar una petición HTTP, el servicio retornará un JSON con la siguiente estructura:

```json
{
"id": 1,
"name": "bebida energetica"
}
```

* **id: number**, id de la categoría
* **name: string**, nombre de la categoría

### GET lista de categorías

* ```GET /api/v1/category``` retornará todas las categorías

**Respuesta**
```json
[
  {
    "id": 1,
    "name": "bebida energetica"
  },
  {
    "id": 2,
    "name": "pisco"
  },
  ...
]
```

## Productos

En este endpoint es posible listar todos los productos o algunos que satisfagan la búsqueda que se encuentra en el params y los filtros y orden que se encuentran en las queries. Solo se puede consumir.

### Estructura JSON

Al realizar una petición HTTP, el servicio retornará un JSON con la siguiente estructura:

```json
{
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490,
    "discount": 20,
    "category": 1
}
```

* **id: number**, id del producto.
* **name: string**, nombre del producto.
* **url_image: string**, es la URL de una imagen representativa del producto.
* **price: number**, precio del producto, sin descuento.
* **discount: number**, es el descuento que tiene el producto, el cual está representado en porcentaje (%).
* **category: number**, id de la categoría que pertenece el producto.

### GET lista de productos

* `GET /api/v1/product` retornará todos los productos

**Queries**

* *sort*, ordena los productos según el orden especificado, las cuales son **az** para ordenarlo de forma alfabetica de la A a la Z, **za** igual que el anterior, pero de la Z a la A, **asc** para ordenarlo por el precio de forma ascendiente y **desc** igual al anterior pero descendiente.

* *categories*, filtra los productos por lo(s) id(s) de la(s) categoría(s).

* *priceRange*, filtra los productos por el o los rangos de precios. Se envía una ternaria de booleanos `priceRange=true,false,true`, el primero corresponde a si está seleccionado el rango de menor de $1500, el segundo para entre $1500 y $5000, y el último para mayor a $5000.

**Ejemplos**
* `GET /api/v1/product?sort=desc&priceRange=true,false,true`: retorna los productos que tiene precios menores de $1500 y mayores a $5000, ordenados por sus precios de mayor a menor.
* `GET /api/v1/product?categories=1,5,7`: retorna los productos de las categorías con las ids 1, 5 y 7, las cuales son bebidas energéticas, snacks y vodkas.

**Respuesta** `/api/v1/product`
```json
[
  {
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490,
    "discount": 20,
    "category": 1
  },
  {
    "id": 6,
    "name": "ENERGETICA RED BULL",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
    "price": 1490,
    "discount": 0,
    "category": 1
  },
  ...
]
```

### GET lista de productos por nombre

* `GET /api/v1/product/:name` retornará todos los productos que tenga el nombre buscado o parte de él.

**Param**

* *name*, parte o el nombre de los productos que se quieren encontrar.

**Queries**

* *sort*, ordena los productos según el orden especificado, las cuales son **az** para ordenarlo de forma alfabética de la A a la Z, **za** igual que el anterior, pero de la Z a la A, **asc** para ordenarlo por el precio de forma ascendiente y **desc** igual al anterior pero descendiente.

* *categories*, filtra los productos por lo(s) id(s) de la(s) categoría(s).

* *priceRange*, filtra los productos por el o los rangos de precios. Se envía una ternaria de booleanos `priceRange=true,false,true`, el primero corresponde a si está seleccionado el rango de menor de $1500, el segundo para entre $1500 y $5000, y el último para mayor a $5000.

**Ejemplos**
* `GET /api/v1/product/ron?sort=az&priceRange=false,false,true`: retorna los productos que contengan en su nombre la palabra "ron", que tienen precios mayores a $5000 y ordenados alfabéticamente de la A a la Z.
* `GET /api/v1/product/lata?categories=1,4,6`: retorna los productos que contengan en su nombre la palabra "lata" de las categorías con las ids 1, 4 y 6, las cuales son bebidas energéticas, bebidas y cerveza.

**Respuesta** `/api/v1/product/lata?categories=1,4,6
```json
[
  {
    "id": 98,
    "name": "Cerveza Escudo Normal LATA 350CC",
    "url_image": "",
    "price": 600,
    "discount": 0,
    "category": 6
  },
  {
    "id": 99,
    "name": "Cerveza Escudo Sin Filtrar LATA 350CC",
    "url_image": "",
    "price": 800,
    "discount": 0,
    "category": 6
  }
]
```