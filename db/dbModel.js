//something
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC');
const db = mongoose.connection;
const csvtojson = require('csvtojson')
const csvFilePath = '/Users/nathanaeltjen/assignmentHR/rfp2212/SDC/SDC_RatingsReviews/db/test.csv'

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})




let reviewSchema = mongoose.Schema({
  // TODO: your schema here!
  product_id: {
    type: Number,
    require: true
  },
  review_id: {
    type: Number,
    require:true
  },
  rating: {
    type: Number,
    require:true
  },
  summary: {
    type: String,
    max:150,
    require:false
  },
  body: {
    type: String,
    min:50,
    max:1000,
    require: true,
  },
  date: {
    type: Date,
    require: true
  },
  reviewer_name: {
    type: String,
    require: true
  },
  reviewer_email: {
    type: String,
    require: true
  },
  helpfulness: {
    type: Number,
    default: () => 0
  },
  recommend: {
    type: Boolean,
    requre:true
  }
});

let photoSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true
  },
  review_id: {
    type: Number,
    require:true
  },
  url: {
    type: String,
    require:true
  }
})

// let metaSchema = mongoose.Schema({
//   product_id: {
//     type: String,
//     require: true
//   },
//   ratings: {
//     type: Number,
//     require: true
//   },
//   recommend: {
//     type: Number,
//     require:true
//   },
//   characteristic: {
//     fit: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     },
//     comfy: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     },
//     size: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     },
//     quality: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     },
//     length: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     },
//     width: {
//       id: {type: Number, require: false},
//       value: {type:Number}
//     }
//   }
// })

let Review = mongoose.model('Review', reviewSchema);
let Photo = mongoose.model('Photo', photoSchema);

// let save = (/* TODO */) => {
//   // TODO: Your code here
//   // This function should save a repo or repos to
//   // the MongoDB
// }

// let injectData = async (req, res) => {
//   csvtojson()
//     .fromFile(csvFilePath)
//     .then(csvData => {
//       console.log(csvData);
//     })
//     .catch((err => {console.log(err)}))
//   // TODO: Your code here
//   // console.log(Repo.find({username: user.username}))
//   // Repo.findOneAndDelete({username: user.username}, (err, data) => {
//   //   console.log(data)
//   // });

//   // // Repo.findOneAndDelete({username: user.username}).exec((data) => console.log('findOnedelete', data))
//   // // console.log(Repo.find({username: user.username}))
//   // console.log('went here save')
//   // new Repo(user).save()
//   // //user has to be an object containing {username:_____, repos: [___,___,___]}
//   // // This function should save a repo or repos to
//   // // the MongoDB
// }

let find = (id, callback) => {
  // Repo.find({ 'username': username}, (err, data) => {
  //   callback(null, data[0].repos)
  // })
  console.log('itishere')

  Review.find({'product_id': id})
    .exec()
    .then((data) => {
      // callback(null, data[0].repos)
      let dataString = JSON.stringify(data);
      let dataPass = JSON.parse(dataString)
      callback(null, dataPass)
      // Promise.all(dataPass.map((review) => {
      //   return Photo.find({review_id: review.review_id})
      //     .exec()
      //     .then((data) => {
      //       review.photos = data
      //       // console.log('photos', review)
      //       // console.log('thisisphoto', data)
      //     })
      //     // .catch(() => {review.photos = []})
      // }))
      //   .then(() => {
      //     callback (null, dataPass);
      //     // console.log(dataPass)
      //   }
      //   )
    })
    .catch(() => {
      callback('no data')})
}

// module.exports.injectData = injectData;
module.exports.find = find;