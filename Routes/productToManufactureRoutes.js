const express = require('express');
const {addProductToManufacture,getProductToManufacture,getProductsToManufacture} = require('../Controllers/productToManufactureController');


const router = express.Router();

router.post('/addProductToManufacture', addProductToManufacture);
router.get('/productToManufacture', getProductsToManufacture);
router.get('/productToManufacture/:id', getProductToManufacture);
//router.put('/updateRawMaterial/:id', updateRawMaterial);
//router.delete('/rawMaterial/:id' ,deleteRawMaterial);

module.exports = {
    routes:router
}