

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
const report = require('./Routes/reportRoutes');

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use('/', rawMaterialRoutes.routes);
app.use('/', newProductRoutes.routes);
app.use('/',contractorRoutes.routes);
app.use('/', productToManufacturing.routes);
app.use('/',loginRoutes.routes);
app.use('/',productToManufacture.routes);
app.use('/',endProductRoutes.routes);
app.use('/',expectedProduct.routes);
app.use('/',report.routes);
//for authentication

app.listen(8080, () =>
  console.log("App is listening on url http://localhost:" + 8080)
);

