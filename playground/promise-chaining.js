// Require mongoose file to connect to the database
require('../src/db/mongoose')

// Require a model to work with
const User = require('../src/models/user')

// 5ffd39e107c8dedc1334abbd
// User.findByIdAndUpdate('5ffd39e107c8dedc1334abbd', { age: 1 }).then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then(result => console.log(result)).catch(error => console.log(error))

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5ffd39e107c8dedc1334abbd', 2).then(returnedCount => console.log(returnedCount)).catch(error => console.log(error))
