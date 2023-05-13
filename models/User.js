const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        minLength : 3
    },
    password : {
        type : String,
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        enum : ['user', 'admin'], // manager roles can be added
        default : 'user',
    }
})

// enum = Enumarated type

userSchema.set('toJSON', {
    transform: (document, returnedDoucument) => {
        returnedDoucument.id = document._id.toString()
        delete returnedDoucument._id
        delete returnedDoucument.password
        delete returnedDoucument.__v
    }
})

module.exports = new mongoose.model('User', userSchema)