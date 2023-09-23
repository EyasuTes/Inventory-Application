const express =require('express')
const router =express.Router()
const categoryController =require('../controllers/categoryController')
const itemController =require('../controllers/itemController')
//const catagoryController = 

router.get('/', categoryController.Home)

router.post('/CreateCategory', categoryController.adder)

router.get('/createCategory', categoryController.creater)

router.post('/CreateItem', itemController.adder )

router.get('/CreateItem', itemController.creater)

router.get('/categories/:id', categoryController.details)

router.get('/items/:id', itemController.details)



router.post('/categories/:id', categoryController.delete)

router.post('/items/:id', itemController.delete)


router.post('/categories/edit/:id', categoryController.edit)

router.post('/editCategory/:id', categoryController.editvalues)


router.post('/items/edit/:id', itemController.edit)

router.post('/editItem/:id', itemController.editvalues)
module.exports =router;