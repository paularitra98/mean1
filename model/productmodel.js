const mongoose=require('mongoose');

var productSchema=new mongoose.Schema({
	uname:String,
    uemail:String,
    gender:String,
    stream:String,
    subject:String,
    pimg:String
});

module.exports=mongoose.model("product",productSchema);