const express = require('express');
require('dotenv').config();

const controllers = require('./controllers');

const router = express.Router();


router.get('/getReview', controllers.reviews.getReview);
router.get('/getMeta', controllers.reviews.getMeta);

router.put('/updateHelpfulness', controllers.reviews.updateHelpfulness)

router.put('/reportReview', controllers.reviews.reportReview),

router.post('/review', controllers.reviews.addReview);


module.exports = router;
// something
