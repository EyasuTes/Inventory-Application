const asyncHandler =require('express-async-handler')
const Item =require('../models/items')
const Category= require('../models/categories')

exports.creater = asyncHandler(async (req, res, next) => {
    const categoryNames = await Category.find({},  'name').exec();
    console.log(categoryNames)
    res.render('createItem' , {categoryNames: categoryNames})
   
     
 });
 exports.adder=asyncHandler(async(req,res,next)=>{
    const doc = await Category.findOne({_id:req.body.category})
    console.log(doc)
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock
      });
      console.log(req.body.category)
    await newItem.save()
    res.redirect('/Home')
})

exports.details=asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const doc =await Item.findById(id)
    const doc1 =await Category.findById(doc.category)
    res.render('ItemDetail', {doc:doc, doc1:doc1})
})

exports.delete=asyncHandler(async(req,res,next)=>{
    //res.send(req.params.id)
     await Item.deleteOne({_id:req.params.id})
     res.redirect('/Home')
 })

exports.edit=asyncHandler(async(req,res,next)=>{
    //console.log(req.params.id)
    const id = req.params.id
    const doc =await Item.findById(id)
    const categoryNames = await Category.find({},  'name').exec();
    const doc1 =await Category.findById(doc.category)
    res.render('editItem', {doc:doc, doc1:doc1,categoryNames:categoryNames })
})

exports.editvalues=asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const doc = await Item.findById(id);
    
    
    doc.name= req.body.name
    doc.description=req.body.description
    doc.category=req.body.category
    doc.price =req.body.price
    doc.number_in_stock=req.body.number_in_stock

    await doc.save()
    console.log(doc)
    res.redirect('/Home')
    
 })
