const express = require('express');
const app = express();

// CORS
const  cors = require("cors");
app.use(cors());

const productRoute = require("./routes/product")
const categoryRoute = require("./routes/category")

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ON, http://localhost:${PORT}`));

app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);

app.get("*", (req, res) => {
    res.send({
      code: '404 Recurso no encontrado',
      message: 'La ruta que esta buscando no forma parte del API REST'
    });
});