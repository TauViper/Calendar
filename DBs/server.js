const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo-routes');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/todo';

app.use(express.json());

app.use(todoRoutes);

mongoose
    .connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));


app.listen(port, (err) => {
    err
        ? console.log(err)
        : console.log(`Example app listening at http://localhost:${port}`);
});


