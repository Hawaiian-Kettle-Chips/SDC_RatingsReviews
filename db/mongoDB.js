const mongoose = require('mongoose');
const uri = 'mongodb://myuser:mypassword@54.185.233.240:27017/SDC-REVIEW';
mongoose.connect(uri);
// const redis = require('redis');
// const redisClient = redis.createClient(6379);
// redisClient.connect()

// db.createUser(
//   {
//     user: "myuser",
//     pwd: "mypassword",
//     roles: [ { role: "readWrite", db: "SDC-REVIEW" } ]
//   }
// )


let reviewSchema = mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    index:true
  },
  review_id: {
    type: Number,
    required:true
  },
  rating: {
    type: Number,
    required:true
  },
  summary: {
    type: String,
    max:150,
    required:false,
    default: () => 'null'
  },
  body: {
    type: String,
    min:50,
    max:1000,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  reviewer_name: {
    type: String,
    required: true
  },
  reviewer_email: {
    type: String,
    required: true
  },
  helpfulness: {
    type: Number,
    default: () => 0
  },
  recommend: {
    type: Boolean,
    required:true
  },
  reported: {
    type:Boolean,
    default: () => false
  },
  response: {
    type: String,
    default: () => 'null'
  },
  photo:[{type: String}],
});

// Define a method to cache query results
// reviewSchema.statics.findCached = function(filter, ex = 600) {
//   console.log('itishere')
//   const key = JSON.stringify(filter);
//   return new Promise(async (resolve, reject) => {
//     // Check if the data is cached in Redis
//     await redisClient.get(key)
//       .then ((cachedData) => {
//         if (cachedData) {
//           console.log('Cache hit');
//           const parsedData = JSON.parse(cachedData);
//           resolve(parsedData);
//         } else {
//           console.log('Cache miss');
//           // If the data is not cached, execute the query and store the results in Redis
//           this.find(filter)
//             .then(data => {
//               // console.log(data)
//               // redisClient.command('info', 'command', 'setex')
//               //   .then((data) => console.log(data))
//               // console.log(redisClient.command('info', 'command', 'setex'))
//               // console.log(data)
//               redisClient.set(key, JSON.stringify(data), ex=ex);
//               resolve(data);
//             })
//             .catch(err => {console.log('heree'); reject(err)});
//         }
//       }).catch(err => {console.log(err);reject(err)})
//   });
// };

// Create the Review model

let photoSchema = mongoose.Schema({
  review_id: {
    type: Number,
    required:true,
    index:true
  },
  url: {
    type: String,
    required:true
  }
});

// Define a method to cache query results
// photoSchema.statics.findCached = function(filter, ex = 600) {
//   const key = JSON.stringify(filter);
//   return new Promise((resolve, reject) => {
//     // Check if the data is cached in Redis
//     redisClient.get(key)
//       .then((cachedData) => {
//         if (cachedData) {
//           console.log('Cache hit');
//           const parsedData = JSON.parse(cachedData);
//           resolve(parsedData);
//         } else {
//           console.log('Cache miss');
//           // If the data is not cached, execute the query and store the results in Redis
//           this.find(filter)
//             .then(data => {
//               // console.log('this is data', data);
//               redisClient.set(key, JSON.stringify(data), ex=ex)
//               resolve(data);
//             })
//             .catch(err => {console.log(err); reject(err)});
//         }
//       })
//       .catch(err => {console.log(err); reject(err)})
//   });
// };

let chacSchema = mongoose.Schema({
  characteristic_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true,
    index:true
  },
  characteristic_name: {
    type: String,
    required: true
  }
})

let chacReviewSchema = mongoose.Schema({
  characteristic_id: {
    type: Number,
    required: true,
    index:true
  },
  review_id: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required:true
  }
})



let Photo = mongoose.model('Photo', photoSchema);
let Chac = mongoose.model('Chac', chacSchema);
let ChacReview = mongoose.model('ChacReview', chacReviewSchema)
let Review = mongoose.model('Review', reviewSchema);

module.exports = {
  Review: Review,
  Photo: Photo,
  Chac: Chac,
  ChacReview: ChacReview
}

// const productID = db.reviews.find({product_id: 1000000});
// productID.explain()
// productID.forEach(function(review) {
//   const photos = db.photos.find({review_id: review.review_id})
//   photos.explain()
//   photos.forEach(function(photo) {
//     printjson(photo);
//   });
// });


// db.chacreviews.find({review_id: review.review_id}).forEach(function(chacreview) {
//   db.chacs.find({characteristic_id: chacreview.characteristic_id})
// });

// var start = new Date();
// db.reviews.find({product_id: 1000000}).forEach(function(review) {
//   db.photos.find({review_id: review.review_id})

// });
// var end = new Date();
// var duration = end - start;
// print("Query time: " + duration + "ms");

// db.reviews.find({product_id: 1000000}).forEach(function(review) {
//   var photoQuery = { review_id: review.review_id };
//   db.photos.find(photoQuery)
// });mongosh