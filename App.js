const express = require("express")
const bodyParser = require("body-parser")
const mongoos= require("mongoose")
const app = express()
const cors = require("cors")
const enquirycontroller=require("./Controllers/enquirycontroller")
const coursecontroller=require("./Controllers/Coursecontroller")
const logincontrollers=require("./Controllers/logincontroller")
app.use(cors());
const path=require("path")
const validation=require("./middleware/validation")
const authentication=require("./middleware/authenticaton")
app.use("/uploads",express.static('uploads'))
const multer = require('multer')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/addstudents", validation.validate,authentication.verifytoken)
app.use("/student", authentication.verifytoken)


const URL = `mongodb+srv://Aayushi_sharma:Ayu12345@cluster0.wqr9uuh.mongodb.net/studentss?retryWrites=true&w=majority`;
mongoos.connect(URL).then(() => {
    console.log("database connect sucessfully")
}).catch((err) => {
    console.log("database not conncted", err)
})


//To getall student data 
app.get("/student",enquirycontroller.getstudent)


//To add new student data
app.post('/addstudents',enquirycontroller.addstudent)

//get single student data
app.get('/student/:studentId', enquirycontroller.getsinglestudent)



//update single student data
app.put("/student/:studentId", enquirycontroller.updatestudent)

//delete single student data

app.delete('/student/:studentId',enquirycontroller.deletestudents )

//search api
app.post("/searchdata",enquirycontroller.searchdata)

//api for pagination
app.post('/pagination', enquirycontroller.paginationapi)

//api to get all courses
app.get("/getcourse", coursecontroller.getcourse)


//to add courses
app.post("/addcourse" ,coursecontroller.addcourse)

//api to register user

app.post("/register", logincontrollers.registerstudent)

//api for login
app.post("/login",logincontrollers.userlogin)
    
//api to upload file
const storageEngine = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};


app.post('/profile', upload.single('image'), logincontrollers.addprofile );

const port = 5779
app.listen(port, () => {
    console.log("server running")
})


