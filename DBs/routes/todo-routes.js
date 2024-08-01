const express = require('express');
const router = express.Router();

const {getUsers,getTodos,
    addTodo,
    getTodo,
    deleteTodo,
    updateTodo,} = require('../controlles/todo-controller');





router.get('/todos',  getTodos)
router.get('/users',  getUsers)
router.post('/todos', addTodo)
router.get('/todos/:id', getTodo)
router.delete('/todos/:id', deleteTodo)
router.patch('/todos/:id', updateTodo)

module.exports = router