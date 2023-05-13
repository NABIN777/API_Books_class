// const books = require('../data/books');
const Book = require('../models/Book');

const getAllbooks = (req, res, next) => {
    Book.find()
        .then(books => res.json(books))
        .catch(next)
}

const createbook = (req, res, next) => {
    Book.create(req.body)
        .then((book) => res.status(201).json(book))
        .catch(err => next(err))
}

const deleteAllbooks = (req, res, next) => {
    Book.deleteMany()
        .then(reply => res.json(reply))
        // .catch(err => console.log(err))
        .catch(next)
}

const getAbook = (req, res, next) => {
    Book.findById(req.params.book_id)
        // .then((book) => res.json(book))
        .then((book) => {
                if(!book) {
                    res.status(404).json({ error: "book not found" }) 
                }
                res.json(book)
            })
        // .catch(err => console.log(err))
        .catch(next)
}

const updateAbook = (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.book_id,
        { $set : req.body },
        { new : true }
    )
    .then(updated => res.json(updated))
    // .catch(err => console.log(err))
    .catch(next)
}

const deleteAbook = (req, res, next) => {
    Book.findByIdAndDelete(req.params.book_id)
    .then(reply => res.status(204).end())
        .catch(next)
    //  const index = books.findIndex((b) => b.id === parseInt(req.params.book_id));
    //     if (index === -1) {
    //       return res.status(404).json({ error: 'Book not found' });
    //     }
    //     books.splice(index, 1);
    //     res.json(books);
}

module.exports = {
    getAllbooks,
    createbook,
    deleteAllbooks,
    getAbook,
    updateAbook,
    deleteAbook
}