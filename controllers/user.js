const { verify } = require('crypto');
const jwt = require ('jsonwebtoken');
const { promisify} =require ('util');

const asyncSign = promisify (jwt.sign);
const user = require ('../models/user');
// const create =(User)=>user.create(User);


// const login= async ({ username, password })=> {
//     const User= await user.findOne({username}).exec();
//     if(!User){
//         throw Error('UN_AUTHENTICATED');
//     }

//     const isValidPass= User.validatePassword(password);
//     if(isValidPass){
//         console.log( isValidPass);
//         throw Error('UN_AUTHENTICATED2');
//     }

//     const token= await asyncSign(
//         { 
//             username: User.username,
//             id: User.id,
//         },
//         'SECRET_MUST_BE_COMPLEX',
//         { expiresIn: '1d' }
//     );




const create = (user) => User.create(user);


const login = async ({ username, password }) => {
const user = await User.findOne({ username }).exec();

  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }

  const isVaildPass = user.validatePassword(password);
  console.log(isVaildPass)
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }

  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' } );
  return { ...user.toJSON(), token };
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