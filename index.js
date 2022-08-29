

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const rawMaterialRoutes = require('./Routes/rawMaterialRoutes');
const newProductRoutes = require('./Routes/newProductRoutes');
const contractorRoutes = require('./Routes/contractorRoutes');
const productToManufacturing = require('./Routes/productToManufacturingRoutes'); 
const loginRoutes = require('./Routes/loginRoutes');
const productToManufacture = require('./Routes/productToManufactureRoutes');
const endProductRoutes = require('./Routes/endProductRoutes');
const expectedProduct = require('./Routes/expectedProductRoutes');

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', rawMaterialRoutes.routes);
app.use('/', newProductRoutes.routes);
app.use('/',contractorRoutes.routes);
app.use('/', productToManufacturing.routes);
app.use('/',loginRoutes.routes);
app.use('/',productToManufacture.routes);
app.use('/',endProductRoutes.routes);
app.use('/',expectedProduct.routes);
//for authentication

app.listen(8080, () =>
  console.log("App is listening on url http://localhost:" + 8080)
);

