const mongoose=require("mongoose");
const Userdetail=new mongoose.Schema({
    email:String,
    password:String, 
    name:String,
    phone:Number,
});
module.exports=mongoose.model("logindetail",Userdetail);