const express = require('express');
const router = express.Router();
const Book = require('../models/NewBook');

// GET a specific book by ID
router.get('/:book_id', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      res.json(book);
    })
    .catch(next);
});

// GET all reviews for a specific book
router.get('/:book_id/reviews', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      res.json(book.reviews);
    })
    .catch(next);
});

// POST a new review for a specific book
router.post('/:book_id/reviews', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      const review = {
        text: req.body.text,
      };
      book.reviews.push(review);
      book.save()
        .then(() => res.status(201).json(review))
        .catch(next);
    })
    .catch(next);
});

// GET a specific review for a specific book
router.get('/:book_id/reviews/:review_id', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      const review = book.reviews.id(req.params.review_id);
      if (!review) return res.status(404).json({ error: 'Review not found.' });
      res.json(review);
    })
    .catch(next);
});

// PUT (update) a specific review for a specific book
router.put('/:book_id/reviews/:review_id', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      const review = book.reviews.id(req.params.review_id);
      if (!review) return res.status(404).json({ error: 'Review not found.' });
      review.text = req.body.text;
      book.save()
        .then(() => res.json(review))
        .catch(next);
    })
    .catch(next);
});

// DELETE a specific review for a specific book
router.delete('/:book_id/reviews/:review_id', (req, res, next) => {
  Book.findById(req.params.book_id)
    .then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found.' });
      const review = book.reviews.id(req.params.review_id);
      if (!review) return res.status(404).json({ error: 'Review not found.' });
      review.remove();
      book.save()
        .then(() => res.sendStatus(204))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
