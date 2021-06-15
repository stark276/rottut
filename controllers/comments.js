const Comment = require('../models/comment');
const Review = require('../models/review');

module.exports = (app) => {
    
    // Submit a new comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body)
            .then((comment) => {
            console.log(comment)
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });
        // CREATE Comment
    // app.post('/reviews/:reviewId/comments', (req, res) => {
    // // INSTANTIATE INSTANCE OF MODEL
    // const comment = new Comment(req.body);

    // // SAVE INSTANCE OF Comment MODEL TO DB
    // comment
    //     .save()
    //     .then(() => Review.findById(req.params.reviewId))
    //     .then((review) => {
    //     review.comments.unshift(comment);
    //     return review.save();
    //     })
    //     .then(() => res.redirect('/'))
    //     .catch((err) => {
    //     console.log(err);
    //     });
    // });

    app.delete('/reviews/comments/:id', (req, res) => {
        console.log('Deleting Comment: ', req.params.id)
        Comment.findByIdAndRemove(req.params.id).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}