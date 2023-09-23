const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = mongoose.Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: Number,
    number_in_stock: Number
})
itemSchema.virtual('url').get(function(){
    return `/Home/items/${this._id}`
})

module.exports= mongoose.model('Item', itemSchema)