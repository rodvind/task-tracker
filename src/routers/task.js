const express = require('express');
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

// Create a task
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(() => res.status(201).send(task)).catch(error => res.status(400).send(error))
})

// GET /tasks?completed=true or false
// GET /tasks?limit=10&skip=20 => pagination
// GET /tasks?sortBy=createdAt_asc or desc or createdAt:asc/desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        console.log(parts);
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        // if (tasks.length === 0) {
        //     return res.status(404).send('There are no tasks registered with this user')
        // }
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.find({}).then(tasks => res.send(tasks)).catch(error => res.status(500).send(error))
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.findById(_id).then(task => !task ? res.status(404).send() : res.send(task)).catch(error => res.status(500).send(error))
})


// Update a specific task
router.patch('/tasks/:id', auth, async (req, res) => {
    // Convert req.body from an object to an array of properties
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{ new: true, runValidators: true })

        // Re-structure the code to have updating a task to trigger middleware
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        // This is where the middleware is gonna get executed
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router