const express = require('express');
const {addReport, getReport} = require('../Controllers/reportController');

const router = express.Router();

router.post('/addReport', addReport);
router.get('/report', getReport);

module.exports = {
    routes:router
}