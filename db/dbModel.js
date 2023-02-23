//something
const mongoose = require('mongoose');
const uri = 'mongodb://myuser:mypassword@54.185.233.240:27017/SDC-REVIEW';
mongoose.connect(uri);
const db = mongoose.connection;
const ReviewSchema = require('./mongoDB.js').Review
const PhotoSchema = require('./mongoDB.js').Photo
const ChacSchema = require('./mongoDB.js').Chac
const ChacReviewSchema = require('./mongoDB.js').ChacReview
// const client = require('../routes.js').client
// const redis = require('redis');
// const client = redis.createClient(6379);
// client.connect()


db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})

let averageRating = [];
let getReview = (product_id, callback) => {
  averageRating = [];
  // to use cache redis use .findCached
  ReviewSchema.find({'product_id': product_id, reported: false})
    .then(async (data) => {
      // console.log('this is data', data)
      let dataString = JSON.stringify(data);
      let dataPass = JSON.parse(dataString)
      await Promise.all(dataPass.map((review) => {
        averageRating.push(review.rating)
        // to use cache redis use .findCached
        return PhotoSchema.find({review_id: review.review_id})
          .then((data) => {
            review.photos = data
          })
          .catch(() => {review.photos = []})
      }))
      return dataPass
        // .then(async () => {
        //   await Promise.all(dataPass.map((review) => {
        //     let characteristic_id = [];
        //     return ChacReviewSchema.find({review_id: review.review_id})
        //       .exec()
        //       .then(async (data) => {
        //         // console.log('ChacReviewData', data)
        //         await Promise.all(
        //           data.map((eachChac) => {
        //             let characteristic = {
        //               characteristic_id : eachChac.characteristic_id,
        //               value : eachChac.value
        //             }
        //             return ChacSchema.find({characteristic_id: eachChac.characteristic_id})
        //             .exec()
        //             .then((data) => {
        //               console.log('this is data',data)
        //               characteristic.name = data[0].characteristic_name;
        //               // console.log(characteristic)
        //               characteristic_id.push(characteristic)
        //             })
        //           })
        //         )
        //         .then(() => console.log('characteristicID', characteristic_id))
        //         .then(() => {
        //           review.characteristic = characteristic_id;
        //           // characteristic_id=[];
        //         })
        //       })
        //   })).then(() => {callback(null, dataPass)})
        // })
    })
    .then((data) => {
      callback(null, data);
      // client.set(product_id, data)
    })
    .catch((err) => { console.log(err)
      callback('no data')})
}

let getMeta = (product_id, callback) => {
  ChacSchema.find({product_id: product_id}, (err, data) => {
    if (err) {
      // callback(err)
    } else {
      let obj = JSON.parse(JSON.stringify(data))
      let id = [];
      let countObj = {};
      Promise.all(
          obj.map((each) => {
          countObj[each.characteristic_id] = [];
          return ChacReviewSchema.find({characteristic_id: each.characteristic_id})
          .then((data) => {
            data.forEach((chac) => {
                countObj[each.characteristic_id].push(chac.value)
              })
            let countLength = countObj[each.characteristic_id].length
            countObj[each.characteristic_id] = Math.round(10*(countObj[each.characteristic_id].reduce((partialSum, a) => partialSum + a, 0))/countLength)/10
            each.value = countObj[each.characteristic_id]
            delete each.product_id
          })
        })
      ).then(() => {
        // count.reduce((partialSum, a) => partialSum + a, 0);
        let avgRate = Math.round(10*(averageRating.reduce((partialSum, a) => partialSum + a, 0))/averageRating.length)/10
        let objResult = {}
        objResult.average_rating = avgRate
        objResult.characteristics = obj
        callback(null, objResult)
      }).catch((err) => {console.log(err)})
    }
  })
}

// updateHelpfulness time can be increased by obtaining _id instead of review_id
let updateHelpfulness = (review_id, callback) => {
  console.log(review_id)
  ReviewSchema.findOneAndUpdate({review_id:review_id}, {$inc: {'helpfulness': 1}})
    .exec()
    .then((data) => {
      // console.log(data)
      callback(null, data)
    })
    .catch((err) => {err})
}

let reportReview = (review_id, callback) => {
  ReviewSchema.findOneAndUpdate({review_id:review_id}, [
    { $set: { reported: { $not: "$reported" } } }
  ])
  .exec()
  .then((data) => {
    // console.log(data)
    callback(null, data)
  })
  .catch((err) => {console.log(err)})
}

let addReview = (newData, callback) => {
  var newDatacopy = JSON.parse(JSON.stringify(newData))
  let arrPhotos = newData.photo
  let newDataPhotos = [];

  newDatacopy.photo = [];

  return new Promise ((resolve, reject) => {
    ReviewSchema.count({}, (err, count) => {
      console.log('here1')
      newDatacopy.review_id = count + 1;
      ReviewSchema.create(newDatacopy, (err, data) => {
        if (err) {
          reject('fail to post, data is not in the right format')
        } else {
          // newData.review_id = newDatacopy.review_id
          resolve(data)
        }
      })
    })
  })
  .then((data) => {
    console.log('here2')
    // console.log(newDatacopy.characteristics)
    return Promise.all(
      newDatacopy.characteristics.map((chac) => {
        let chacReview = {}
        chacReview.characteristic_id = chac.characteristic_id;
        chacReview.review_id = newDatacopy.review_id;
        chacReview.value = chac.value;
        console.log(chacReview)
        return ChacReviewSchema.create(chacReview, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            console.log(data)
          }
        })
      }) )
        .then(() => {
          console.log('here3')
          if (arrPhotos.length > 0) {
            console.log('here2')
            Promise.all(arrPhotos.map(async (photo) => {
              let photoInsert = {review_id: newDatacopy.review_id}
              photoInsert.url = photo
              return PhotoSchema.create(photoInsert)
                .then((data) => {newDataPhotos.push(data._id)})
            }))
              .then(() => callback(null, newData))
          } else {
            callback(newData)
          }
        })
        .catch((err) => {callback(err)})
    })
    .catch((err) => {callback(err)})
}
module.exports.getReview = getReview;
module.exports.updateHelpfulness = updateHelpfulness
module.exports.reportReview = reportReview
module.exports.addReview = addReview
module.exports.getMeta = getMeta