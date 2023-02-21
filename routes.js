const express = require('express');
require('dotenv').config();

const controllers = require('./controllers');

const router = express.Router();

// router.post('/injectData', controllers.reviews.injectData);

router.get('/findReview', controllers.reviews.findReview);
router.get('/findChac', controllers.reviews.findChac);

router.put('/updateHelpfulness', controllers.reviews.updateHelpfulness)

router.put('/reportReview', controllers.reviews.reportReview),

router.post('/review', controllers.reviews.addReview);

// router.put('/reviews/:review_id/helpful', controllers.reviews.setHelpfulReview);

// router.put('/reviews/:review_id/report', controllers.reviews.reportReview);

module.exports = router;
// something
