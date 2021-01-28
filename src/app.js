const exprees = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = exprees()

app.use(exprees.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app