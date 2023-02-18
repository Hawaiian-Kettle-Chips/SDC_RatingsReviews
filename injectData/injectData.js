const ReviewSchema = require('../db/mongoDB.js').Review
const PhotoSchema = require('../db/mongoDB.js').Photo
const ChacSchema = require('../db/mongoDB.js').Chac
const ChacReviewSchema = require('../db/mongoDB.js').ChacReview
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

// Connection URL and database name
const url = 'mongodb://localhost:27017/SDC-REVIEW';

// Create a mongoose schema to define the structure of the data
// Create a mongoose model based on the schema
// const myModel = mongoose.model('mycollection', mySchema);

// Read the CSV file and insert each row into the MongoDB collection
let arr1 =[];
let arr2=[];
let arr3=[];
let arr4=[];
let arr5=[];
let arr6=[];
let arr7=[];
let arr8=[];
let arr9=[];
let arr10=[];
let count=0;
fs.createReadStream('/Users/nathanaeltjen/assignmentHR/rfp2212/SDC/characteristic_reviews.csv')
  .pipe(csv())
  .on('data', async (row) => {
    // let newData = {
    //   product_id: row.product_id,
    //   review_id: row.id,
    //   rating: row.rating,
    //   summary: row.summary,
    //   body: row.body,
    //   date: row.date,
    //   reviewer_name: row.reviewer_name,
    //   reviewer_email: row.reviewer_email,
    //   helpfulness: row.helpfulness,
    //   recommend: row.recommend,
    //   response: row.response,
    //   reported: row.reported
    // }
    // let newData = {
    //   photo_id: row.id,
    //   review_id: row.review_id,
    //   url: row.url
    // }
    // let newData = {
    //   review_id: row.id,
    // }
    let newData = {
      characteristic_id: row.characteristic_id,
      review_id: row.review_id,
      value: row.value
    }



    // Insert the new data into the MongoDB collection using Mongoose
    // arr1.push(newData)
    if (arr1.length < 2000000) {
      arr1.push(newData)
    } else {
      if (arr2.length < 2000000) {
        arr2.push(newData)
      } else {
        if (arr3.length < 2000000) {
          arr3.push(newData)
        } else {
          if (arr4.length < 2000000) {
            arr4.push(newData)
          } else {
            if (arr5.length < 2000000) {
              arr5.push(newData)
            } else {
              if (arr6.length < 2000000) {
                arr6.push(newData)
              } else {
                if (arr7.length < 2000000) {
                  arr7.push(newData)
                } else {
                  if (arr8.length < 2000000) {
                    arr8.push(newData)
                  } else {
                    if (arr9.length < 2000000) {
                      arr9.push(newData)
                    } else {
                      if (arr10.length < 2000000) {
                        arr10.push(newData)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  .on('end', async () => {
    console.log(arr1.length)
    console.log(arr2.length)
    console.log(arr3.length)
    console.log(arr4.length)
    console.log(arr5.length)
    console.log(arr6.length)
    console.log(arr7.length)
    console.log(arr8.length)
    console.log(arr9.length)
    console.log(arr10.length)
    console.log('it is here')
    count = 0;
    function arr1func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr1[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr1[count].review_id}, arr1[count], async function
            (err, res) {
          if (err) throw err;
          count++
          if (arr1[count]) {
            await arr1func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }

    function arr2func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr2[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr2[count].review_id}, arr2[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr2[count]) {
            await arr2func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr3func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr3[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr3[count].review_id}, arr3[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr3[count]) {
            await arr3func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr4func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr4[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr4[count].review_id}, arr4[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr4[count]) {
            await arr4func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr5func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr5[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr5[count].review_id}, arr5[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr5[count]) {
            await arr5func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr6func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr6[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr5[count].review_id}, arr5[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr6[count]) {
            await arr6func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr7func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr7[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr6[count].review_id}, arr6[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr7[count]) {
            await arr7func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr8func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr8[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr6[count].review_id}, arr6[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr8[count]) {
            await arr8func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr9func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr9[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr6[count].review_id}, arr6[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr9[count]) {
            await arr9func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }
    function arr10func (count) {
      return new Promise( (resolve, reject) => {
        ChacReviewSchema.create(arr10[count], async function
        // ReviewSchema.findOneAndUpdate({review_id: arr6[count].review_id}, arr6[count], async function
          (err, res) {
          if (err) throw err;
          count++
          if (arr10[count]) {
            await arr10func(count)
          }
          count = 0
          resolve('resolve')
        });
      })
    }

    await arr1func(count)
    await arr2func(count)
    await arr3func(count)
    await arr4func(count)
    await arr5func(count)
    await arr6func(count)
    await arr7func(count)
    await arr8func(count)
    await arr9func(count)
    await arr10func(count)
    return console.log('done')
    // return console.log('done')
  })

// Connect to the MongoDB database
mongoose.connect(url, function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB.');
});

