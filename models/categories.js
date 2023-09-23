const mongoose =require('mongoose')

const categorySchema = mongoose.Schema({
    name : String,
    description: String,

})

categorySchema.virtual('url').get(function(){
    return `/Home/categories/${this._id}`
})

module.exports = mongoose.model('Category', categorySchema)
