const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

//create a table
router.post('/table', tableController.createTable);

//get all tables
router.get('/table',tableController.getTable);

//get specific table 
router.get('/table/:id', tableController.getTableByID);

//update table 
router.put('/table/:id',tableController.updateTable);

//delete table
router.delete('/table/:id', tableController.deleteTable);

module.exports = router;