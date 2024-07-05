const express = require('express');
const {connectToDb, getDb} = require('./db');
const {ObjectId} = require("mongodb");
const app = express();
const port = 3000;

app.use(express.json());

const errorHandler = (res, err) => {
    res
        .status(500)
        .contentType('text/plain')
        .send({err});
}


connectToDb((err) => {
   if(!err){
       app.listen(port, (err) => {
           err
               ? console.log(err)
               : console.log(`Example app listening at http://localhost:${port}`);
       });
       return getDb();
   }else{
       console.log(err);
   }
})

app.get('/todos', (req, res) => {
    const todos=[]
    getDb()
        .collection('todo')
        .find()
        .forEach(todo => todos.push(todo))
        .then(() => {
            res
                .status(200)
                .contentType('application/json')
                .send(todos)
        })
        .catch((err) => errorHandler(res, err))
})
app.get('/todos/:id', (req, res) => {
if(ObjectId.isValid(req.params.id)){
    getDb()
        .collection('todo')
        .findOne({_id: new ObjectId( req.params.id)})

        .then((doc) => {
            res
                .status(200)
                .contentType('application/json')
                .send(doc)
        })
        .catch((err) => errorHandler(res, err))
}else{
   errorHandler(res, 'Not found')
}
})
app.delete('/todos/:id', (req, res) => {
if(ObjectId.isValid(req.params.id)){
    getDb()
        .collection('todo')
        .deleteOne({_id: new ObjectId( req.params.id)})

        .then((result) => {
            res
                .status(200)
                .contentType('application/json')
                .send(result)
        })
        .catch((err) => errorHandler(res, err))
}else{
    errorHandler(res, 'Not found')
}
})
app.post('/todos', (req, res) => {
    getDb()
        .collection('todo')
        .insertOne(req.body)
        .then((result) => {
            res
                .status(201)
                .contentType('application/json')
                .send(result)
        })
        .catch((err) => errorHandler(res, err))
})
app.patch('/todos/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        getDb()
            .collection('todo')
            .updateOne({_id: new ObjectId( req.params.id)}, {$set: req.body})
            .then((result) => {
                res
                    .status(200)
                    .contentType('application/json')
                    .send(result)
            })
            .catch((err) => errorHandler(res, err))
    }else{
        errorHandler(res, 'something went wrong')
    }
})