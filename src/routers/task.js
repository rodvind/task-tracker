const express = require('express');
const router = new express.Router()
const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.find({}).then(tasks => res.send(tasks)).catch(error => res.status(500).send(error))
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)
        
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    
    // Task.findById(_id).then(task => !task ? res.status(404).send() : res.send(task)).catch(error => res.status(500).send(error))
})



router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findById(req.params.id)
        updates.forEach(update => task[update] = req.body[update])
        // This is where the middleware is gonna get executed
        await task.save()

        if (!task) {
            return res.status(400).send()
        }

        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(() => res.status(201).send(task)).catch(error => res.status(400).send(error))
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router