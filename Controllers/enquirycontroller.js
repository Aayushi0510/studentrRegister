const express = require("express")
const Students = require("../studentschema")


exports.getstudent = async (req, res) => {
    try {
        let data = await Students.find({})
        res.send({ status: "ok", msg: "all student data get successfully", data: data })

    } catch (error) {
        res.send({ status: "failed", msg: "somthing went wrong", data: null })

    }
}

exports.addstudent = (req, res) => {
    try {
        const {
            name, email, phone, whatsappno, dob, address, workingExp, company, course, fee
        } = req.body
        let addStudentToInsert = { name, email, phone, whatsappno, dob, address, workingExp, company, course, fee }
        const data = Students.create(addStudentToInsert)
        res.send({ status: "OK", msg: "student successfully added", data: data })
    }
    catch (err) {
        res.send({ status: "failed", msg: "student not added", data: data })
        //console.log(err)

    }
}
exports.getsinglestudent = async (req, res) => {
    try {
        let { studentId } = req.params
        console.log(studentId)
        let data = await Students.findById({ _id: studentId })
        res.send({ status: "OK", msg: "student get sucessfully", data: data })
    } catch (error) {
        res.send({ status: "failed", msg: "something went wrong", data: null })
    }

}

exports.updatestudent=async (req, res) => {
    let { studentId } = req.params;

    let { name, email, phone, whatsapp,  dob, address, workingExp, company, coursename, fee
,createdBy} = req.body
    console.log(req.body)
    try {
        let data = await Students.findByIdAndUpdate({ _id: studentId }, { $set: { name, email, phone, whatsapp, 
            dob, address, workingExp, company,course, fee ,createdBy} })
        res.send({ status: "ok", msg: "data updated succesfully", data: data })

    } catch (err)
    {
        res.send({ status: "failed", msg: "something went wrong", data: null })
        console.log(err)
    } 
}

exports.deletestudents=async(req, res) => {
    try{
    let { studentId } = req.params
    console.log(studentId)
    let data = await Students.findByIdAndDelete({ _id: studentId })
    res.send({status:"OK", msg:"student get sucessfully", data:data})
    }catch(error)
    {     
           res.send({ status: "failed", msg: "something went wrong", data: null })
    }
}
exports.searchdata=async(req,res)=>{

    let {query, page, limit, sortBy,sortType}=req.body
         page= page ? page:1
         limit=  limit ? limit:5
         sortBy=sortBy ? sortBy: "name"
         sortType=sortType  ? sortType: "ASC"
         try{
            let searchNameQuery=[];
            let key=["name","email","phone", "whatsappno", "dob", "address", "workingExp", "company","course","fee", "createBy"]
            for(let each in key)
            {
                let keys=key[each]
                let value={$regex: `.*${query}.*`,$options:"i"}
    
                 searchNameQuery.push({[keys]:value})
            }
            //console.log(searchNameQuery)
    
            let data= await Students.aggregate([
            {$match:{$or:searchNameQuery}},
            {$sort:{[sortBy]: sortType === "ASC" ? 1:-1}},
            {$skip:(page-1)*limit},
            {$limit:limit},
        ])

        let count=await Students.aggregate([
            {$match:{}},
            {$count:"totalcount"}
        ])  
        res.send({status:"ok", msg:"successfully", data:{data ,count}})
        } catch(e)
        {
            res.send({status :"error", msg:"successfully",data:null})
            console.log(e)
        }
     }

exports.paginationapi=async (req, res) => {
    try {
        const { query, page, limit, sortBy, sortType } = req.body
        const params = ["name", "email", "phone", "whatsappno", "dob", "address", "workingExp", "company", "course", "fee"
        ]
        console.log(query)
        let searchQuery = []
        for (let each in params) {
            let key = params[each];
            let value = { $regex: `/${query}`, $options: 'i' }

            searchQuery.push({ [key]: value })
        }
        console.log(searchQuery)
        let datas = await Students.aggregate([{ $match: { $or: searchQuery } },
        ])
        res.send({ status: "ok", msg: "data updated succesfully", data: datas })
    } catch (e) {
        res.send({ status: "err", msg: "data updated succesfully", data: null })

    }
}