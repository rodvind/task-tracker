const exprees = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')


const app = exprees()
const port = process.env.PORT || 3000
app.use(exprees.json())

app.use(userRouter)
app.use(taskRouter)

// Create a new Rout, setup those routes, finally register it 
// with express app
// const router = new exprees.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })
// app.use(router)

// app.post('/users', async (req, res) => {
//     const user = new User(req.body)
//     try {
//         await user.save()
//         res.status(201).send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
    
//     // user.save().then(() => res.status(201).send(user)).catch(error => {
//     //     res.status(400).send(error)
//     //     // res.send(error)
//     // })
//     // console.log(req.body);
//     // res.send('testing!');
// })

// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(500).send(error)
//     }
//     // User.find({}).then(users => res.send(users)).catch(error => res.status(500).send(error))
// })

// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
    
//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
//     // User.findById(_id).then(user => {
//     //     if (!user) {
//     //         return res.status(404).send()
//     //     }

//     //     res.send(user)
//     // }).catch(error => res.status(500).send(error))
// })

// // Update a user
// app.patch('/users/:id', async (req, res) => {
//     // When try to update a property which doesn't exist
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every(update => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true })

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send()
//     }
// })
// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
//     // Task.find({}).then(tasks => res.send(tasks)).catch(error => res.status(500).send(error))
// })

// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
    
//     try {
//         const task = await Task.findById(_id)
        
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
    
//     // Task.findById(_id).then(task => !task ? res.status(404).send() : res.send(task)).catch(error => res.status(500).send(error))
// })



// app.patch('/tasks/:id', async (req, res) => {
//     // Convert req.body from an object to an array of properties
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ["description", "completed"]
//     const isValidOperation = updates.every(update => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid update!' })
//     }

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true })
//         if (!task) {
//             return res.status(400).send()
//         }

//         res.send(task)
//     } catch (error) {
//         res.status(404).send()
//     }
// })

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)

//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // task.save().then(() => res.status(201).send(task)).catch(error => res.status(400).send(error))
// })

// app.delete('/tasks/:id', async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id)

//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(400).send()
//     }
// })

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})