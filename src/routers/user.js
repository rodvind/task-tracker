const express = require('express')
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const auth = require('../middleware/auth')
const router = new express.Router()

// User Sign up
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
    
    // user.save().then(() => res.status(201).send(user)).catch(error => {
    //     res.status(400).send(error)
    //     // res.send(error)
    // })
    // console.log(req.body);
    // res.send('testing!');
})

// User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
        // res.send({ user: user.getPublicProfile(), token })
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (error) {
    //     res.status(500).send(error)
    // }
    // User.find({}).then(users => res.send(users)).catch(error => res.status(500).send(error))
})

// router.get('/users/:id', async (req, res) => {
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

// Update a user
router.patch('/users/me', auth, async (req, res) => {
    // When try to update a property which doesn't exist
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true })

        // const user = await User.findById(req.params.id)

        updates.forEach(update => req.user[update] = req.body[update])

        // This is where the middleware is gonna get executed
        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})
// router.patch('/users/:id', async (req, res) => {
//     // When try to update a property which doesn't exist
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every(update => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators: true })

//         const user = await User.findById(req.params.id)

//         updates.forEach(update => user[update] = req.body[update])

//         // This is where the middleware is gonna get executed
//         await user.save()

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

// When there is no "dest" property setup on multer, we have access to file
// on "req"
router.post('/users/me/avatar', auth, upload.single('avatar') , async (req, res) => {
    
    // Create a const to store the output from sharp, a buffer 
    // of modified image file which is stored into the database
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    // req.user.avatar = req.file.buffer
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // Tell the requester whether the image is png or jpg or jpeg
        // by using a header
        // res.set('Content-Type', 'image/jpg')
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(400).send()
    }
})
// router.delete('/users/:id', auth, async (req, res) => {
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

module.exports = router