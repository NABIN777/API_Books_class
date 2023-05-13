require('dotenv').config()
const exp = require('express');
let books = require('./data/books')
const mongoose = require('mongoose')
const broute = require('./routes/book-routes')
const uroute = require('./routes/user-routes')
const { verifyUser } = require('./middlewares/auth');
const upload = require('./middlewares/upload');

const port = process.env.PORT

mongoose.connect('mongodb://127.0.0.1:27017/demo')
    .then(() => {
        console.log('Connected to mongodb database server');
    })
    .catch((err) => 
        console.log(err)
    )

const app = exp();

// Middle Wear - software that lies between an operating system and the applications running on it(Cerates a response for a request)

app.use(exp.json())
app.use(exp.static('public'))

// 1st parameter is route and 2nd is req and res
app.get('/', (request, response) => {
    console.log(request);
    // response.send('Hello World')
    response.send('Hello')
});

// main path
app.use('/books', verifyUser, broute)
// app.use(verifyUser)
app.use('/users', uroute)

// importing uploads from middleware
app.use('/upload', upload.single('photo'), (req, res, next) => {
    res.json(req.file)
})

// Error Handling middlewear
app.use((err, req, res, next) => {
    console.error(err);
    if(err.name === 'ValidationError') res.status(400)
    else if (err.name == "CastError") res.status(400)
    res.json({ error: err.message })
})

// Unknown Path
app.use((req, res, next) => {
    res.status(404).json({error:"Path not found"})
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})

// app.get('/api/books', (req, res) => {
//     res.json(books);
// })

// app.post('/api/books',(req, res) => {
//     if(!req.body.title){
//         return res.status(400).json({error: 'Title is missing'})
//     }
//     const book = {
//         id : books.length + 1,
//         title : req.body.title,
//         author : req.body.author || 'Anonymous' 
//     }
//     books.push(book)
//     // res.json(book)
//     res.status(201).json(book)
//     // res.json(req.body);
// })

// app.put('/api/books/:book_id', (req, res) => {
//     // Maps return type is list
//     const updated_books = books.map((b) => {
//         if(b.id == req.params.book_id){
//             b.title = req.body.title
//             b.author = req.body.author
//         }
//         return b
//     })
//     res.json(updated_books)
// })

// app.delete('/api/books/:book_id', (req, res) => {
//     books = books.filter((b) => {
//         return b.id != req.params.book_id
//     })
//     res.json(books)
// })

// // Dyanamic routing
// app.get(('/api/books/:book_id'), (req, res)=> {
//     console.log(req.params)
//     const book = books.find((b) => b.id == req.params.book_id)
//     res.json(book)
// })

// // Takes a 1st parameter port(listens to the port)
// app.listen(port, () => {
//     console.log(`Running server at port ${port}`);
// })

// // == only compares value not type === compares type 
