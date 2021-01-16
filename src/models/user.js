const mongoose = require('mongoose')
const validator = require('validator')


// Create a Model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email provided is invalid')
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "password"')
            }
        } 
    }
})

module.exports = User

// const me = new User({
//     name: '     Rodvin      ',
//     email: '   XVDM@WNN.IO    ',
//     password: ' Paonagoaet12321 '
// })

// If things go well, we'll get access to our Model instance which "me"
// me.save().then(() => console.log(me)).catch(error => console.log('Error!', error))