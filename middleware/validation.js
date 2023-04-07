const Joi = require('joi'); 

exports.validate=(req,res,next)=>
{

    console.log("validation middleware")

    const Schema=Joi.object().keys({
        name:Joi.string().required(), 
        email:Joi.string().required(),
        phone:Joi.string().required().min(3).max(10),   
        whatsappno:Joi.string().required().min(3).max(10),
        dob:Joi.string().required(),
        address:Joi.string().required(),
        workingExp:Joi.string().required(),
        company:Joi.string().required(),
        course:Joi.string().required(),
        fee:Joi.string().required(),
        createdBy:Joi.string().required(),
    })
    const {error}=Schema.validate(req.body,{aboutEarly:false});
if(error)
{
    res.status(200).send(error)
}
else{
    next();
}
}
