const mongoose = require('mongoose');

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
    default: () => 0,
    index:true
  },
  recommend: {
    type: Boolean,
    requre:true
  },
  photo:[{type: Number}]
});

let photoSchema = mongoose.Schema({
  _id: {
    type:Number,
    require:true
  },
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

let Review = mongoose.model('Review', reviewSchema);
let Photo = mongoose.model('Photo', photoSchema);

module.exports = {
  Review: Review,
  Photo: Photo
}