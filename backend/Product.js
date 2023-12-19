const mongoose= require("mongoose");
const productSchema=new mongoose.Schema({
   abc:String,
   img:String
})
module.exports=mongoose.model('items',productSchema)