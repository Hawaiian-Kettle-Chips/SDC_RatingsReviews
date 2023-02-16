const express = require('express');
const db = require('../db/dbModel.js')

let reviews = {
  injectData: (req, res) => {
    db.injectData(req, res)
      .then(() => {console.log('success controller iD')})
      .catch((err) => {console.log(err)})
    console.log(req)
  },
  findReview: (req, res) => {
    console.log('this is body', req.query)
    db.find(req.query.id, (err, data) => {
      console.log(data)
      res.json(data)
      res.status(200)
      res.end()
    })
  },
  addReview:{},
  setHelpfulReview:{},
  reportReview:{}
}

module.exports.reviews = reviews;
// something
