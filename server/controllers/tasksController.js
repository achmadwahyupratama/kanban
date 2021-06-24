const {Task, Category} = require('../models')

class TaskController{
    static addTask(req, res, next){
        let newTask = {
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            UserId: req.activeUser.id,
            CategoryId: req.body.CategoryId
        }
        Task.create(newTask)
            .then(createdTask => {
                res.status(201).json(createdTask)
            })
            .catch(err =>{
                next(err)
            })
    }


    static fetchAllTasks(req, res, next){
        Category.findAll( { include: { model: Task } } )
            .then(categories =>{
                res.status(200).json(categories)
            })
            .catch(err =>{
                next(err)
            })
    }



    static fetchTasks(req, res, next){
        const CategoryId = +req.params.categoryId
        Task.findAll({where: { CategoryId: CategoryId }, include: { model: Category }})
            .then(tasks => {
                res.status(200).json(tasks)
            })
            .catch(err => {
                next(err)
            })
    }

    static fetchTaskById(req, res, next){
        const taskId = +req.params.taskId
        Task.findByPk(taskId, {include: {model: Category}})
            .then(foundTask =>{
                if (foundTask) {
                    res.status(200).json(foundTask)
                } else {
                    next({name: "Not Found", message:`Data with id ${findId} not found`})                    
                }
            })
            .catch(err =>{
                next(err)
            })
    }

    static putTask(req, res, next){
        const updateId = +req.params.taskId
        let updateTask = {
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            UserId: req.activeUser.id,
            CategoryId: req.body.CategoryId
        }
        Task.update( updateTask, {where : { id: updateId }, returning: true} )
            .then(result=>{
                if (result[0] === 0) {
                    next({name: "Not Found", message:`Data with id ${updateId} not found`})
                } else {
                    res.status(200).json(result[1][0])
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static patchTask(req, res, next){
        const updateId = +req.params.taskId
        let updateTask = {
            CategoryId: req.body.CategoryId
        }
        Task.update( updateTask, {where : { id: updateId }, returning: true} )
            .then(result=>{
                if (result[0] === 0) {
                    next({name: "Not Found", message:`Data with id ${updateId} not found`})
                } else {
                    res.status(200).json(result[1][0])
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteTask(req, res, next){
        const deleteId = +req.params.taskId
        Task.destroy({
            where: {
                id: deleteId
            }
        })
            .then((data)=>{
                if (data) {
                    res.status(200).json({success: {message: `Task id: ${deleteId} success to delete`}})
                } else {
                    next({name: "Not Found", message:`Data with id ${deleteId} not found`})
                }
            })
            .catch((err)=>{
                next(err)
            })
    }
}

module.exports = TaskController