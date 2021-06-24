// const {User} = require('../models')
const express = require('express')
const LogController = require('../controllers/logController.js')
const authenticate = require('../middlewares/authentication.js')
const user = require('../models/user.js')
const categoryRouter = require('./categoryRouter')
const tasks = require('./taskRouter.js')
const router = express.Router()


router.post('/register', LogController.register)
router.post('/login', LogController.login)
router.post('/googlelogin', LogController.googleLogin)


router.use( authenticate )
router.use('/categories', categoryRouter )
router.use('/tasks', tasks )
// router.delete('/:id', function (req, res, next){
//     const idToDelete = +req.params.id
//     User.destroy({where: {
//         id: idToDelete
//     }})
//         .then((data)=>{
//             res.status(200).json(`deleted id ${idToDelete}`)
//         })
//         .catch((err)=>{
//             next(err)
//         })
// })
module.exports = router