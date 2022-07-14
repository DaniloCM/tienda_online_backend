const express = require('express');
const app = express();

// CORS
const cors = require("cors");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ON, http://localhost:${PORT}`));

// Routes
//// Rutas de los productos con GET /api/v1/product y GET /api/v1/product/:name
const productRoute = require("./routes/product")
app.use("/api/v1/product", productRoute);

//// Ruta de las categorias con GET /api/v1/category
const categoryRoute = require("./routes/category")
app.use("/api/v1/category", categoryRoute);

// Ruta para las consultas que no estan dentro de la API
app.get("*", (req, res) => {
    res.send({
      code: '404 Recurso no encontrado',
      message: 'La ruta que esta buscando no forma parte del API REST'
    });
});