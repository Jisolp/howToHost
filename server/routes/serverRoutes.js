const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');

//create a new server
router.post('/server', serverController.createServer);

//get all the servers
router.get('/server', serverController.getServers);

//get specific servers
router.get('/server/:id',serverController.getServerByID);

//get table counts for servers
router.get('/server/:id/tables', serverController.getServerTableCount);

//delete server
router.delete('/server/:id', serverController.deleteServer);

module.exports = router;