const Review = require('../models/review');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = function (app) {

    // INDEX
    app.get('/', (req, res) => {
        const currentUser = req.user;

        Review.find({}).lean().populate('author')
            .then(reviews => {
                res.render('reviews-index', { reviews, currentUser });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // NEW REVIEW FORM (TEMPLATE)
    app.get('/reviews/new', (req, res) => {
        
        res.render('reviews-new', {title: "Post a Review"})
    })

    // CREATE
    app.post('/reviews/new', (req, res) => {
        if (req.user) {
        const userId = req.user._id;
        const review = new Review(req.body);
        review.author = userId;

        review
            .save()
            .then(() => User.findById(userId))
            .then((user) => {
            user.reviews.unshift(review);
            user.save();
            // REDIRECT TO THE NEW review
            return res.redirect(`/reviews/${review._id}`);
            })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

    // GETTING SINGLE REVIEW
    app.get('/reviews/:id', (req, res) => {
        const currentUser = req.user;

        Review.findById(req.params.id).lean().populate('comments').populate('author')
            .then(review => {
            Comment.find({ reviewId: req.params.id })
                .then(comments => {
                    res.render('reviews-show', 
                    { review, comments, currentUser })
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
