const User = require("../schemas/userSchema");
const Todo = require("../schemas/todosSchema");

const errorHandler = (res, err) => {
    res
        .status(500)
        .contentType('text/plain')
        .send({err: err})
}

const getTodos = (req, res) => {

    User
        .find().populate('task')
        .then((todos) => {
            console.log(1, todos)
            res
                .status(200)
                .contentType('json')
                .send(todos)
        })
        .catch((err) => {
            console.log(2, err)
            errorHandler(res, err)
        })
}
const getUsers = (req, res) => {

    User
        .find()

        .then((users) => {
            res
                .status(200)
                .contentType('json')
                .send(users)
        })
        .catch((err) => {
            console.log(2, err)
            errorHandler(res, err)
        })
}
const getTodo = (req, res) => {
    Todo
        .findById(req.params.id)
        .then((doc) => {
            res
                .status(200)
                .contentType('json')
                .send(doc)
        })
        .catch((err) => errorHandler(res, err))
}
const addTodo = async (req, res) => {

    const task = req.body

    const newTask = new Todo(task)

    try {
        let user = null
        if(task.user) {
            user = await User.findById(task.user)
            if(!user) {
                res.status(400).send({err: 'User not found'})
                return
            }
        }

        const result = await newTask.save()

        if(user) {
            await User.findByIdAndUpdate(user._id, { task: [...user.task, result._id]})
        }

        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
    // const todos = []
    // req.body.task.forEach((el) => {
    //     todos.push(new Todo(el))
    // })
    //
    // const user = new User({...body, task: todos})

    // User.findOne({userName: req.body.userName })
    //     .then((doc)=>{
    //         if (doc) {
    //             console.log('Todo',doc)
    //             console.log('Body',req.body.task)
    //             User.updateMany(doc.task,  req.body.task)
    //             //    Todo.insertMany( req.body.task).then((result) => {
    //             //        console.log(result)
    //             // });
    //               } else {
    //                 // Пользователь с данным username не найден
    //                 console.log(`Пользователь с данным \`${doc}\` не найден`);
    //               }
    //     })
    // for (const todo of todos) {
    //     todo.user = user._id
    //     await todo.save()
    // }
    // try {
    //     const result = await user.save()
    //     res
    //         .status(200)
    //         .contentType('json')
    //         .send(result)
    // } catch (err) {
    //     errorHandler(res, err)
    // }
}
const updateTodo = (req, res) => {
    Todo
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res
                .status(200)
                .contentType('json')
                .send(result)
        })
        .catch((err) => errorHandler(res, err))
}
const deleteTodo = (req, res) => {
    Todo
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res
                .status(200)
                .contentType('json')
                .send(result)
        })
        .catch((err) => errorHandler(res, err))
}

module.exports = {
    getTodos, getTodo, addTodo, updateTodo, deleteTodo, getUsers
}