const { Category } = require('../models')
class CategoryController{
    static addCategory(req, res, next){
        const newCategory = { categoryName: req.body.categoryName }
        Category.create(newCategory)
            .then(createdCategory=>{
                res.status(201).json(createdCategory)
            })
            .catch(err => {
                next(err)
            })
    }
    static deleteCategory(req, res, next){
        const idToDelete = req.params.categoryId
            Category.destroy({where: {
                id: idToDelete
            }})
                .then((data)=>{
                    if (data) {
                        res.status(200).json({succes : {message : `deleted category with id ${idToDelete}`}})
                    } else {
                        next({name: "Not Found", message:`Category with id ${deleteId} not found`})
                    }
                })
                .catch((err)=>{
                    next(err)
                })
    }
}

module.exports = CategoryController