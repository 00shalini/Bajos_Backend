const express = require('express');
const {addNewProduct, getNewProducts, getNewProduct, updateProduct, deleteProduct} = require('../Controllers/productController');


const router = express.Router();

router.post('/addNewProduct', addNewProduct);
router.get('/products', getNewProducts);
router.get('/product/:id', getNewProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/product/:id' ,deleteProduct);

module.exports = {
    routes:router
}