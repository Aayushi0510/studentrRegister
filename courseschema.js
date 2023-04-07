
const mongoose=require("mongoose");
const Courses=new mongoose.Schema(
    {
        coursename:String,
    },
    {timestamps:true}
);



module.exports=mongoose.model("Courses" ,Courses);