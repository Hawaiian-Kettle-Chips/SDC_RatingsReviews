//something
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC-REVIEW');
const db = mongoose.connection;
const csvtojson = require('csvtojson')
const ReviewSchema = require('./mongoDB.js').Review
const PhotoSchema = require('./mongoDB.js').Photo
const ChacSchema = require('./mongoDB.js').Chac
const ChacReviewSchema = require('./mongoDB.js').ChacReview

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
})


let findReview = (product_id, callback) => {
  console.log('itishere')

  ReviewSchema.find({'product_id': product_id, reported: false})
    .exec()
    .then(async (data) => {
      // callback(null, data[0].repos)
      let dataString = JSON.stringify(data);
      let dataPass = JSON.parse(dataString)
      // callback(null, dataPass)
      await Promise.all(dataPass.map((review) => {
        return PhotoSchema.find({review_id: review.review_id})
          .exec()
          .then((data) => {
            review.photos = data
            // console.log('photos', review)
            // console.log('thisisphoto', data)
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
    .then((data) => callback(null, data))
    .catch(() => {
      callback('no data')})
}

let findChac = (product_id, callback) => {
  ChacSchema.find({product_id: product_id}, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
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
module.exports.findReview = findReview;
module.exports.updateHelpfulness = updateHelpfulness
module.exports.reportReview = reportReview
module.exports.addReview = addReview
module.exports.findChac =findChac