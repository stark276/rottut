const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function (app) {

    // get home route, all reviews
    app.get('/', (req, res) => {
        Review.find().lean()
            .then(reviews => {
                res.render('reviews-index', { reviews: reviews });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // NEW REVIEW FORM (TEMPLATE)
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {title: "Post a Review"})
    })

    // CREATING A REVIEW
    app.post('/reviews', (req, res) => {
        Review.create(req.body)
            .then((review) => {
                console.log(review);
                res.redirect(`/reviews/${review._id}`)
            })
            .catch((err) => {
                console.log(err.message);
            })
    })

    // GETTING SINGLE REVIEW
    app.get('/reviews/:id', (req, res) => {
        Review.findById(req.params.id)
            .then(review => {
            Comment.find({ reviewId: req.params.id })
                .then(comments => {
                    res.render('reviews-show', 
                    { review: review, comments: comments })
                })
            }).catch((err) => {
                console.log(err.message);
            });
    })

    // GETTING EDIT FORM
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id, function (err, review) {
            res.render('reviews-edit', { review: review, title: "Edit Review" });
        }).catch((err) => {
            console.log(err.message);
        });
    })

    // LOGIC FOR UPDATING A REVIEW
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            }).catch((err) => {
                console.log(err.message);
            })
    })

    // LOGIC FOR DELETING A REVIEW
    app.delete('/reviews/:id', function (req, res) {
        console.log('Delete review');
        Review.findByIdAndRemove(req.params.id).then((review) => {
            console.log(`Successfully deleted: ${review}`)
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}