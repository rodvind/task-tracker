const app = require('./app')

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


// const exprees = require('express')
// require('./db/mongoose')

// const userRouter = require('./routers/user');
// const taskRouter = require('./routers/task')


// const app = exprees()
// const port = process.env.PORT || 3000


// app.use(exprees.json())
// app.use(userRouter)
// app.use(taskRouter)

// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // if(!file.originalname.endsWith('.pdf')) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }

//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a word document'))
//         }

//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined)

//     }
// })

// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware')
// }

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled!')
//     } else {
//         next()
//     }
//     // console.log(req.method, req.path);
//     // next()
// })

// Maintenance Middleware
// app.use((req, res, next) => {
//     res.status(503).send('The sever is under maintenance, please come back shortly')
// })

// const Task = require('./models/task')

// const main = async () => {
//     // const task = await Task.findById('6005afe53af7c07a42173b22')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner);

//     const user = await User.findById('6005afd53af7c07a42173b20')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }

// main()

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewsecret', { expiresIn: '7 days' })
//     console.log(token);
//     const data = jwt.verify(token, 'thisismynewsecret')
//     console.log(data);
// }
// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch);
// }

// myFunction()

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