const Artical = require ('../models/articles');
 const create=(Articals)=> Artical.create(Articals);
 const getAll =()=> Artical.find({}).exec();
 const searchBtId=(id)=>Artical.findById(id).exec();
 const editArtical=(id , body)=> Artical.findAndUpdate(id , body,{new:true}).exec();
const deleteById=(id)=> Artical.findByIdAndDelete(id).exec();
const searchByTitle=({title})=> Artical.find({title}).exec();
const searchByTag=({tag})=>Artical.find({tag}).exec();
const searchauther = ({auther}) => Blog.find({auther}).exec();
module.exports={
   create,
   getAll,
   searchBtId,
   editArtical,
   deleteById,
   searchBtId,
   searchByTag,
   searchByTitle , 
   searchauther

}
