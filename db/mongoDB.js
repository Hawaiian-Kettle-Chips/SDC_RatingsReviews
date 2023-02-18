const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
  // TODO: your schema here!
  product_id: {
    type: Number,
    required: true
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
    default: () => 0,
    index:true
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
  characteristic: [{type: String}]
});

let photoSchema = mongoose.Schema({
  review_id: {
    type: Number,
    required:true
  },
  url: {
    type: String,
    required:true
  }
})

let chacSchema = mongoose.Schema({
  characteristic_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  characteristic_name: {
    type: String,
    required: true
  }
})

let chacReviewSchema = mongoose.Schema({
  characteristic_id: {
    type: Number,
    required: true
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

let Review = mongoose.model('Review', reviewSchema);
let Photo = mongoose.model('Photo', photoSchema);
let Chac = mongoose.model('Chac', chacSchema);
let ChacReview = mongoose.model('ChacReview', chacReviewSchema)

module.exports = {
  Review: Review,
  Photo: Photo,
  Chac: Chac,
  ChacReview: ChacReview
}