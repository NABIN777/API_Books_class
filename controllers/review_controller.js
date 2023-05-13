const Book = require('../models/Book')

const getAllReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then((book) => {
            if (!book) return res.status(404).json({ error: 'book not found' })
            res.json(book.reviews)
        }).catch(next)
}

const createReview = (req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                const review = {
                    text: req.body.text,
                    user: req.user.id,
                }
                book.reviews.push(review)
                book.save()
                    .then((book) => res
                        .status(201)
                        .json(book.reviews[book.reviews.length - 1]))
                    .catch(next)
            }).catch(next)
}

const deleteReviews = (req, res, next) => {
    Book.findById(req,params.book_id)
        .then((book) => {
            if (!book) 
                return res.status(404).json({ error : 'book not found' })
                book.reviews = []
                book.save()
                    .then((book) => res.status(204).end())
                    .catch(next)
    }).catch(next)
}

const reviewAbook = (req,res,next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) 
                return res.status(404).json({ error: 'book not found' })
                const review = book.reviews.id(req.params.review_id)
                if(!review)
                    return res.status(404).json({ error : "reviews not found"})
                res.json(review)
        }).catch(next)
}

const editAbook = (req, res, next) => {
    Book.findById(req.params.book_id)
            .then(book => {
                if (!book)
                    return res.status(404).json({ error : 'book not found '})
                    // to find use map
                book.reviews = book.reviews.map((r) => {
                    if(r.id === req.params.review_id) {
                        // Check for user
                        if(r.user == req.user.id) {
                            r.text = req.body.text
                        }
                    }
                    return r
                })
                book.save()
                    .then(book => {
                        res.json(book.reviews.id(req.params.review_id))
                    })
                    .catch(next)
            }).catch(next)
}

const deleteAreview = (req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if(!book)
                    return res.status(404).json({ error: "book not found "})
                    // to delete use filter
                    // book.reviews = book.reviews.filter((r) => {
                    //     return r.id !== req.params.review_id
                    // })
                    book.reviews = book.reviews.find((r) => {
                        if(r.id == req.params.review_id && r.user == req.user.id) {
                            return r.id !== req.params.review_id
                        }
                    })
                    book.save()
                        .then(book => res.status(204).end())
                        .catch(next)
            }).catch(next)
}


module.exports = {
    getAllReviews,
    createReview,
    deleteReviews,
    reviewAbook,
    editAbook,
    deleteAreview
}