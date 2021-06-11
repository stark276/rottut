const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Comment = require('../models/comment');

var reviewSchema = new Schema({
    title: String,
    movieTitle: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;