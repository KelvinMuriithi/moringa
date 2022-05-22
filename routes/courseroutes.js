const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();

router.get('/', courseController.index);

router.get('/create',courseController.create_course);

router.post('/', courseController.store)

router.get('/:id', courseController.show)

router.delete('/:id',courseController.destroy)




module.exports = router;