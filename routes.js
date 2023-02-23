const express = require('express');
require('dotenv').config();
const controllers = require('./controllers');
const router = express.Router();

// const redis = require('redis');
// const client = redis.createClient(6379);
// client.connect()

// // handle client connection events
// client.on("connect", function() {
//   console.log("Connected to Redis server");
// });

// client.on("error", function (err) {
//   console.error("Error connecting to Redis server", err);
// });

// // set a key-value pair in Redis
// client.set("mykey", "myvalue", function(err, reply) {
//   if (err) {
//     console.error("Error setting value in Redis", err);
//   } else {
//     console.log("Value set successfully in Redis", reply);
//   }
// });

// function reviewCache(req, res, next) {
//   console.log('this goes here')
//   const product_id = req.query.product_id

//   client.get(product_id)
//     .then((data) => {
//       if (data !== null) {
//         res.send(data);
//         res.status(200);
//         res.end()
//       } else {
//         console.log('here')
//         next();
//       }
//     })
//     .catch(()=> {console.log('her2')})
// }


router.get('/getReview', controllers.reviews.getReview);
router.get('/getMeta', controllers.reviews.getMeta);

router.put('/updateHelpfulness', controllers.reviews.updateHelpfulness)

router.put('/reportReview', controllers.reviews.reportReview),

router.post('/review', controllers.reviews.addReview);


module.exports = {
  router:router,
};
// something
