const ReviewSchema = require('../db/mongoDB.js').Review
const PhotoSchema = require('../db/mongoDB.js').Photo
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
let count=0;
fs.createReadStream('/Users/nathanaeltjen/assignmentHR/rfp2212/SDC/RESET/SDC_RatingsReviews/reviews.csv')
  .pipe(csv())
  .on('data', async (row) => {
    // Re-schema the data
    let newData = {
      product_id: row.product_id,
      review_id: row.id,
      rating: row.rating,
      summary: row.summary,
      body: row.body,
      date: row.date,
      reviewer_name: row.reviewer_name,
      reviewer_email: row.reviewer_email,
      helpfulness: row.helpfulness,
      recommend: row.recommend
    }


    // Insert the new data into the MongoDB collection using Mongoose
    // arr1.push(newData)
    if (arr1.length < 1000000) {
      arr1.push(newData)
    } else {
      if (arr2.length < 1000000) {
        arr2.push(newData)
      } else {
        if (arr3.length < 1000000) {
          arr3.push(newData)
        } else {
          if (arr4.length < 1000000) {
            arr4.push(newData)
          } else {
            if (arr5.length < 1000000) {
              arr5.push(newData)
            } else {
              if (arr6.length < 1000000) {
                arr6.push(newData)
              }
            }
          }
        }
      }
    }
  })
  .on('end', async () => {
    console.log(arr1.length)
    console.log('it is here')
    count = 0;
    function arr1func (count) {
      return new Promise( (resolve, reject) => {
        ReviewSchema.create(arr1[count], async function(err, res) {
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
        ReviewSchema.create(arr2[count], async function(err, res) {
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
        ReviewSchema.create(arr3[count], async function(err, res) {
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
        ReviewSchema.create(arr4[count], async function(err, res) {
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
        ReviewSchema.create(arr5[count], async function(err, res) {
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
        ReviewSchema.create(arr6[count], async function(err, res) {
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

    await arr1func(count)
    await arr2func(count)
    await arr3func(count)
    await arr4func(count)
    await arr5func(count)
    await arr6func(count)
    return console.log('done')
    // return console.log('done')
  })

// Connect to the MongoDB database
mongoose.connect(url, function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB.');
});

