const express = require('express');
const router = express.Router();
const sectionsController = require('../controllers/sectionController');

//create a new section 
router.post('/section', sectionsController.createSection);

//get all the sections 
router.get('/section', sectionsController.getSections);

//get specific sections 
router.get('/section/:id', sectionsController.getSectionByID);

//delete section
router.delete('/section/:id', sectionsController.deleteSection);

module.exports = router;