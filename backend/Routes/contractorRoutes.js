const express = require('express');
const {addContractor, getContractor,getContractors, updateContractor} = require('../Controllers/contractorController');

const router = express.Router();

router.post('/addContractor', addContractor);
router.get('/contractors', getContractors);
router.get('/contractor/:id', getContractor);
router.put('/updateContractor/:id', updateContractor);
//router.delete('/product/:id' ,deleteRawMaterial);

module.exports = {
    routes:router
}