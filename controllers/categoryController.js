const Category =require('../models/categories')
const Item =require('../models/items')
const asyncHandler =require('express-async-handler')

exports.Home = asyncHandler(async (req, res, next) => {
  
   const categories = await Category.find({}, 'name description url').exec()
   const items =await Item.find({}, 'name description url ').exec()
   res.render('index', {titleC: 'Categories',titleI: 'Items', categories:categories, items:items} ) 
    
});
exports.creater=asyncHandler(async(req,res,next)=>{
    res.render('createCategory')
})

exports.adder=asyncHandler(async(req,res,next)=>{
    const newCategory = new Category({
        name: req.body.name,
        description: req.body.description,
      });
    await newCategory.save()
    res.redirect('/Home')
})

exports.details=asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const doc = await Category.findById(id);
    res.render('CategoryDetail', {doc:doc})
    
})
exports.delete=asyncHandler(async(req,res,next)=>{
   //res.send(req.params.id)
    await Category.deleteOne({_id:req.params.id})
    res.redirect('/Home')
})

exports.edit=asyncHandler(async(req,res,next)=>{
    //res.send(req.params.id)
    const doc = await Category.findById(req.params.id);
     res.render('editCategory', {doc:doc})
 })

 exports.editvalues=asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const doc = await Category.findById(id);
    
    doc.name= req.body.name
    doc.description=req.body.description

    await doc.save()
    console.log(doc)
    res.redirect('/Home')
 })
