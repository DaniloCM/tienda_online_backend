const express = require('express');
const app = express();

// CORS
const  cors = require("cors");
app.use(cors());

const productRoute = require("./routes/product")

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ON, http://localhost:${PORT}`));

app.use("/api/v1/product", productRoute);