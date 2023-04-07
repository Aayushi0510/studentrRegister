const mongoose=require("mongoose");
const Students=new mongoose.Schema({
   
    name:String, 
    email:String,
    phone:String,   
    whatsappno:String,
    dob:String,
    address:String,
    workingExp:String,
    company:String,
    course:String,
    fee:String,
    createdBy:String,
});
module.exports=mongoose.model("Students" ,Students);