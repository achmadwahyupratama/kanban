const express = require('express')
const CategoryController = require('../controllers/categoriesController')
const categoryRouter = express.Router()

categoryRouter.post('/', CategoryController.addCategory )
categoryRouter.delete('/:categoryId', CategoryController.deleteCategory )

module.exports = categoryRouter