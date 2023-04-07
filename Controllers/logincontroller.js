const express = require("express")
const Userdetail = require('../loginSchema')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');




exports.registerstudent = async (req, res) => {
    let { email, password, name, phone } = req.body
    const user = await Userdetail.findOne({ email: email })
    if (user) {
        res.send({ status: "failed", msg: "emailalready registered" })
    }
    else if (email && password && name && phone) {
        let hashpassword = await bcrypt.hash(password, 10)
        Userdetail.create({ email: email, password: hashpassword, name: name, phone: phone })
            .then(() => {
                res.send({ status: "ok", msg: "user is registered" })
            }).catch(() => {
                res.send("data is not created")
            })


    }
    else {
        res.send({ status: "failed", msg: "all feild compulsory" })
    }
}


exports.userlogin = async (req, res) => {
    let { email, password } = req.body
    if (email && password) {

        try {
            const secret = "mysecretkey"

            let data = await Userdetail.findOne({ email })
            if (!data) {
                res.send("user is not valid")
            }
            else {
                bcrypt.compare(password, data.password).then(function (result) {
                    const token = jwt.sign({ _id: data._id }, secret)
                    console.log(token)
                    result ? res.send({
                        message: "Login successful",
                        data,
                        token
                    })
                        : res.send({ message: "Login not succesful" })
                })
            }

        } catch (error) {
            res.send({
                message: "An error occurred",
                error: error.message,
            })
        }
    }
}


exports.addprofile = async (req, res, next) => {
    try {
        const name = req.file.path
        const file = req.file
        await imageSchema.create({ name })
        res.send({ status: "ok", msg: "file updayed sucessfuly", data: { name, file } })
        console.log(file)

    } catch (error) {
        res.send({ status: "ok", msg: "file updayed sucessfuly", data: null })
    }

}