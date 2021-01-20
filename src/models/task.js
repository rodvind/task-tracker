const mongoose = require('mongoose')
const validator = require('validator')

// Create a task schema
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// const task = new Task({
//     description: '    Study js Course  ',
// })

// task.save().then(() => console.log(task)).catch(error => console.error('Error!', error))