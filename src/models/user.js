const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// Create a method on a user to get the user profile as an objec
userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

// Create a virtual property for the User Model
// It is not actual data and it is a relationship between two entities
// between Task and User models
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

// Create a method for issuing a token for an authorized user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewsecret')
    
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// Attach a method to the userSchema to be able to find
// the user by credentials which can be accessed by an 
// instance of the User on our user route
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Using a method on our model to set the middleware up
// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    // console.log('Just before saving!');

    // If the passwors is modified, avoid double-hashing
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner: user._id })

    next()
})

// Create a Model
const User = mongoose.model('User', userSchema)

module.exports = User

// const me = new User({
//     name: '     Rodvin      ',
//     email: '   XVDM@WNN.IO    ',
//     password: ' Paonagoaet12321 '
// })

// If things go well, we'll get access to our Model instance which "me"
// me.save().then(() => console.log(me)).catch(error => console.log('Error!', error))