const express = require('express')
const TaskController = require('../controllers/tasksController')
const authorize = require('../middlewares/authorization')
const taskRouter = express.Router()

taskRouter.post('/', TaskController.addTask)
taskRouter.get('/', TaskController.fetchAllTasks)
taskRouter.get('/:categoryId/:taskId', TaskController.fetchTaskById)
taskRouter.get('/:categoryId', TaskController.fetchTasks)

taskRouter.put('/:taskId', authorize , TaskController.putTask)
taskRouter.patch('/:taskId', authorize , TaskController.patchTask)
taskRouter.delete('/:taskId', authorize , TaskController.deleteTask)
module.exports = taskRouter