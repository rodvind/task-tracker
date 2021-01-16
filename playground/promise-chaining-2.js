require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete({ _id: '5ffde5fc1d469fdf80cdb305' }).then(task =>{
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then(result => console.log(result)).catch(error => console.log(error))

const deleteTaskAndcount = async (id, completed) => {
    const task = await Task.findByIdAndDelete({ _id: id })
    const count = await Task.countDocuments({ completed })
    return { task, count }
}

deleteTaskAndcount('5ffcdbaec43f24d6a54bfb5e', false).then(obj => {
    console.log('task: ', obj.task);
    console.log('count: ', obj.count);
}).catch(error => console.log(error))