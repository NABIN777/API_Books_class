const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum:['user','admin'],
    // default:,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.set('toJSON', {
  transform: (doc, returnedData) => {
    returnedData.id = returnedData._id.toString();
    delete returnedData._id;
    delete returnedData.__v;
    delete returnedData.password;
  }
});

module.exports = mongoose.model("User", userSchema);
