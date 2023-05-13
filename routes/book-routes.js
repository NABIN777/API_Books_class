const express = require('express');
// const books = require('../data/books');
const bookController = require('../controllers/book_controller')
const reviewController = require('../controllers/review_controller')
const { verifyAdmin } = require('../middlewares/auth')

const router = express.Router()

// This makes codes organized rather then writing everthing in one file
router.route('/')
    .get(
        bookController.getAllbooks
    )
    .post(
        verifyAdmin,
        bookController.createbook
    )

    .put((req, res) => {
        res.status(405).json({ error:"This method (PUT) is not allowed" })
    })

    .delete(
        bookController.deleteAllbooks
    )
    
router.route('/:book_id')
    .get(
        bookController.getAbook
    )

    .post((req, res) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .put(
        bookController.updateAbook
    )

    .delete(
        bookController.deleteAbook
    );

router.route('/:book_id/reviews')

    .get(
        reviewController.getAllReviews
    )

    .post(
        reviewController.createReview
    )

    .put((req, res, next) => {
        res.status(405).json({error: 'This method (PUT) is not allowed'})
        .catch(next)
    })

    .delete(
        reviewController.deleteReviews
    )
      
router.route('/:book_id/reviews/:review_id')

    .get(
        reviewController.createReview
    )

    .put(
        reviewController.deleteAreview    
    )

    .post((req, res, next) => {
        res.status(405).json({error: 'This method (POST) is not allowed'})
    })

    .delete(
        reviewController.deleteAreview
    )

module.exports = router