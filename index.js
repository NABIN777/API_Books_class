require('dotenv').config()           
const portRoute = process.env.PORT

//Importing routes.
const books_routes = require('./routes/books-rout')


const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/demo')   // mongodb://localhost:27017/demo will not work.
        .then(() => console.log("Connected to mongodb."))
        .catch((err) => console.log(err))


const express = require('express')


//Creating an object.
const app = express()

//For request to take JSON files.
app.use(express.json())   // Remember this, without this, POST will not work!!!!!!

// Using routes from another file.
app.use('/books', books_routes)

// Error handling middleware.
// All error types can be defined here.
// Should be below routes.
app.use((err, req, res, next) => {
        console.error(err)

        if(err.name == "ValidationError") res.status(400)
        else if(err.name == "CastError") res. status(400)

        res.json({error: err.message})
})


//Unknown Path.
//Should be at last.
app.use((req, res) => {
        res.status(404).json({error : "Path Not Found"})
})


//It can be anywhere, but by convention keep it ay last.
app.listen(portRoute, () =>{
        console.log(`server is running in ${portRoute}`)   //  Formatted string: `` not ''
     })
    