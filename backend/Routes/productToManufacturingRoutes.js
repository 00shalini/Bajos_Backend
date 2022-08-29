const express = require('express');
const {addProductToManufacturing, getProductsToManufacturing, getProductToManufacturing} = require('../Controllers/ProductToManufacturingController');


const router = express.Router();

router.post('/addProductToManufacturing', addProductToManufacturing);
router.get('/productToManufacturing', getProductsToManufacturing);
router.get('/productToManufacturing/:id', getProductToManufacturing);
//router.put('/updateRawMaterial/:id', updateRawMaterial);
//router.delete('/rawMaterial/:id' ,deleteRawMaterial);

module.exports = {
    routes:router
}