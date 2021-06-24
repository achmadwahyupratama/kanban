const {Task} = require('../models/index.js')

async function authorize (req, res, next){
    try {
        const idToFind = +req.params.taskId
        let foundTask = await Task.findByPk(idToFind)
        if (foundTask) {
            if (foundTask.UserId === req.activeUser.id) {
                next()
            } else {
                next({name: "Authorization Error", message: "You are not authorized"})
            }
        } else {
            next({name: "Not Found", message: `Data with id ${idToFind} not found`})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorize