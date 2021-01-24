const jwt = require('jsonwebtoken');
const { promisify}= require('util');
const user = require ('../models/user');

const asyncVerify=promisify(jwt.verify);
const auth=async (req, res, next)=>{
    const { headers :{ authorization}}=req;
    if(!authorization){
        next((new Error ('un_authorized')) );

    }
    try{
        const {id}=await asyncVerify(authorization,'secret_must_be_complex');
        const user =await user.findById(id).exec();
        req.user=user;
        next();
    }
    catch(e){
        next( (new Error('un_authorized ')));
    }
};
module.exports=auth;