const express = require('express');
const {addEndProduct, getEndProducts} = require('../Controllers/endProductController');

const router = express.Router();

router.post('/addEndProduct', addEndProduct);
router.get('/endProducts', getEndProducts);


module.exports = {
    routes:router
}