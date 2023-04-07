const express = require("express")
const Courses=require("../courseschema")


exports.getcourse=async (req, res) => {
    try{
    let data = await Courses.find({})
    res.send({status: "ok", msg: "data updated succesfully", data: datas})
    }catch(error)
    {
        res.send({status: "ok", msg: "something went wrong", data: null})

    }
}

exports.addcourse=(req, res) => {
    const { coursename } = req.body
    Courses.create({ coursename }).then(() => {

        res.send({status: "ok", msg: "data updated succesfully"})

    }).catch(() => {
        res.send({status: "failed", msg: "data not updated succesfully", data: null})
    })
}