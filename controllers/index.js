const express = require('express');
const db = require('../db/dbModel.js')

let reviews = {
  // injectData: (req, res) => {
  //   db.injectData(req, res)
  //     .then(() => {console.log('success controller iD')})
  //     .catch((err) => {console.log(err)})
  //   console.log(req)
  // },
  getReview: (req, res) => {
    console.log('this is body', req.query)
    db.getReview(req.query.product_id, (err, data) => {
      if (err) {
        console.log(err)
        res.status(500)
        res.end()
      } else {
        // console.log(data)
        res.json(data)
        res.status(200)
        res.end()
      }
    })
  },
  getMeta: (req, res) => {
    db.getChac(req.query.product_id, (err, data) => {
    if (err) {
      res.status(500)
      res.end()
    } else {
      res.status(200)
      res.json(data)
      res.end()
    }
    })
  },
  updateHelpfulness: (req, res) => {
    console.log(req.query)
    db.updateHelpfulness(req.query.review_id, (err, data) => {
      // console.log(data)
      // res.json(data)
      if (err) {
        res.status(500)
        res.end()
      } else {
        res.status(201)
        res.end('updated')
      }
    })
  },
  reportReview: (req, res) => {
    db.reportReview(req.query.review_id, (err, data) => {
      if (err) {
        res.status (500)
        res.end()
      } else {
        res.status(202)
        res.end('updated')
      }
    })
  },
  addReview: (req, res) => {
    // console.log(req.body)
    // res.end()
    db.addReview(req.body, (err, data) => {
      if (err) {
        res.status(500)
        res.write('data is not valid')
        res.end()
      } else {
        console.log(data)
        res.status(205)
        res.end('data')
      }
    })
  }
}

module.exports.reviews = reviews;
// something
