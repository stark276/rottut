const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Comment = require('../models/comment');
const Populate = require('../util/autopopulate');


var reviewSchema = new Schema({
    title: String,
    movieTitle: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
} ,{ timestamps: true });
// Always populate the author field
reviewSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'));

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;