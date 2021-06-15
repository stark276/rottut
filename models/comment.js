const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Populate = require('../util/autopopulate');

var commentSchema = new Schema({
    title: String,
    content: String,
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},{ timestamps: true });
// Always populate the author field
commentSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))
  .pre('findOne', Populate('comments'))
  .pre('find', Populate('comments'));

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;