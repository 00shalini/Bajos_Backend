const express = require('express');
const {addExpectedProduct, getExpectedProduct} = require('../Controllers/expectedProductController');


const router = express.Router();

router.post('/addExpectedProduct', addExpectedProduct);
router.get('/expectedProduct', getExpectedProduct);

//router.put('/updateRawMaterial/:id', updateRawMaterial);
//router.delete('/rawMaterial/:id' ,deleteRawMaterial);

module.exports = {
    routes:router
}