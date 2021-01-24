const { json } = require('express');
const express = require ('express');
const route = express.Router();
const { create , getAll , searchById , editArtical , deleteById , searchByTitle ,  searchByTag ,searchauther } =require ('../controllers/artical')


const auth = require ('../middleware/auth')

route.get('/' , async(req,res,next)=> {

    try{
       const Artical =await getAll();
       res.json(Artical);
    }
    catch (e){
        next(e);
    }

});
route.use(auth);
route.get('/:id', async(req, res, next)=>{
    const{ params : {id}}=req;
    try{
        const Artical =await searchById ({ id});
        res.json(Artical);

    }
    catch (e){
        next(e);
    }
});

route.get('/title/:title', async (req, res, next) => {
    const { params : {title} } = req;
  try {
    const Articles = await searchByTitle({title});
    res.json(Articles);
  } catch (e) {
    next(e);
  }
});



route.get('/tag/:tag', async(req,res,next)=>{
    const { params : {tag} } = req;
    try {
        const Artical =await searchByTag({tag });
        res.json(Artical);

    }
    catch (e){
        next(e);
    }
});
route.post('/', async(req,res,next)=>{
    const {body } =req;
    try{
        const Artical =await create({...body});
        res.json(Artical);
    }
    catch(e){
        next(e);
    }
});

route.patch('/:id', async(req,res,next)=>{
    const { params : {id}, body }=req;
    
    try{
        const Artical = await editArtical({id}, body);
        res.json(blogs);
    }
    catch(e){
        next(e);
    }

});

route.delete('/:id' , async(req,res,next)=>{
   const { params : {id} } = req;
   try{
       const Artical =await deleteById({ id});
       res.send('Delete Done')
   }
   catch(e){
       next(e);
   }

});

route.get('/auther/:auther', async (req, res, next) => {
    const { params : {auther} } = req;
    try {
    const blogs = await searchauther({auther});
    res.json(blogs);
    } catch (e) {
    next(e);
    }
    });


module.exports=route;