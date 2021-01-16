const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task

// const task = new Task({
//     description: '    Study js Course  ',
// })

// task.save().then(() => console.log(task)).catch(error => console.error('Error!', error))