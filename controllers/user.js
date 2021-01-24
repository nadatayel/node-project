const { verify } = require('crypto');
const jwt = require ('jsonwebtoken');
const { promisify} =require ('util');

const asyncSign = promisify (jwt.sign);
const user = require ('../models/user');
const create =(User)=>user.create(User);

const login =async ({ username , password  })=>{
    const User = await user.findOne({ username }).exec();

    if(!User){
        throw Error("un_authenticated ");
    }
    const isVaildPass=user.validatePassword(password);

    console.log(isVaildPass)
    if(!isVaildPass){
        throw Error ('un_authenticated');
    }
    const token= await asyncSign({
        username: User.username,
        id: User.id     }, 'secret_must_be_complex');
        return { ...User.toJSON(), token};
};

const getAll=()=> user.find({}).exec();
const editOne =(id , data)=> user.findByIdAndUpdate(id, data , { new : true}  ).exec();


const addfollow = (id, trgetid)=> User.update(
    { "_id": id },
    {
    $push: {
    fowlling: trgetid
    }
    }
    );
    const unfollow = (id, trgetid)=> User.update(
        { "_id": id },
        {
        $pull: {
        fowlling: trgetid
        }
        }
        );



module.exports={
    create,
    login,
    getAll,
    editOne,
    addfollow,
    unfollow
};