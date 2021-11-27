const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');

const UserSchema = new Schema({
    username: {type: String, required: true, minlength: [3, 'Name should atleast be of 3 characters'], lowercase: true,},
    email:    {type: String, required: true, validate: [isEmail, 'Enter a valid email address'], lowercase: true,},
    password: {type: Number, required: true, minlength: [8, 'Password should be atleast 8 characters']},
});

module.exports = mongoose.model('Users', UserSchema);
