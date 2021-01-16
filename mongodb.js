// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.id.length);
console.log(id.toHexString().length);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    // console.log('Connected correctly!');
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Mehrnoush',
    //     age: 19
    // }), (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // }

    // db.collection('users').insertMany([
    //     {
    //        name: 'Jen', 
    //        age: 28
    //     }, {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ]), (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log('result.ops')
    // }
    // db.collection('tasks').insertMany([
    //     // {
    //     //     description: 'Do the BoJo',
    //     //     compleated: true
    //     // }, {
    //     //     description: 'Study NodeJs Course',
    //     //     compleated: false
    //     // }, 
    //     {
    //         description: 'Study ReactJs Course',
    //         compleated: false
    //     }
    // ]), (error, result) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(result.ops);
    // }

    // Read/Fetch Data from a collection
    // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(user);
    // })

    // db.collection('users').findOne({ _id: new ObjectID('5ffc96ceb59bc1cc5d7bafbb') }, (error, user) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({ age: 2 }).toArray((error, users) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(users);
    // })

    // db.collection('users').find({ age: 2 }).count((error, count) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5ffc9ced92f150cd4247f62d") }, (error, task) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(task);
    // })

    // db.collection('tasks').find({ compleated: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log(tasks);
    // })
    // const updatePromise = db.collection('users').updateOne({ _id: new ObjectID("5ffc916e6bfa80cbeb4d446c") }, { $set: {
    //     name: 'Mike'
    // }})

    // updatePromise.then(result => {console.log(result);}).catch(error => {console.log(error);})
    // db.collection('users').updateOne({ _id: new ObjectID("5ffc916e6bfa80cbeb4d446c") }, { $set: {
    //     name: 'Mike'
    // }}).then(result => {console.log(result);}).catch(error => {console.log(error);})
    // db.collection('users').updateOne({ _id: new ObjectID("5ffc916e6bfa80cbeb4d446c") }, { $inc: {
    //     age: 2
    // }}).then(result => {console.log(result);}).catch(error => {console.log(error);})

    // db.collection('tasks').updateMany({
    //     compleated: false
    // }, {
    //     $set: {
    //         compleated: true
    //     }
    // }
    // ).then(result => console.log(result.modifiedCount)).catch(error => console.log(error))
    
    // db.collection('users').deleteMany({
    //     name: 'Rodvin'
    // }).then(result => console.log(result)).catch(error => console.log(error))
    
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then(result => console.log(result)).catch(error => console.log(error))

    db.collection('users').deleteOne({
        age: 19
    }).then(result => console.log(result)).catch(error => console.log(error))

})
