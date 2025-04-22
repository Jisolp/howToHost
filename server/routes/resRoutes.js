const express = require('express');
const router = express.Router();
const resController = require('../controllers/resController');

//create a reservation 
router.post('/reservation',resController.addReservation);

//get all reservation 
router.get('/reservation', resController.getReservations);

//get specific reservation 
router.get('/reservation/:id', resController.getReservationByID);

//update reservation 
router.put('/reservation/:id',resController.updateReservation);

//delete reservation
router.delete('/reservation/:id', resController.deleteReservation);

module.exports = router;