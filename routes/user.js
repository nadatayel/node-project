const express = require ('express');
const{
    create, login , getAll , editOne, addfollow , unfollow
} = require('../controllers/user');
const router = express.Router();
router.post('/', async (req, res,next)=> {
    const {body }=req;
     try{
         const user=await create(body);
         res.json(user);
     }
     catch(e){
     next(e);
     }
});
router.post('/login', async (req,res, next)=>{
    const {body}=req;
    try{
        const user =await login(body);
        res.json(user);
    }
    catch (e){
        next(e);
    }

});
 router.get('/',async(req,res,next)=>{
     try{
         const users =await getAll();
         res.json(users);
     }
     catch(e){
         next(e);
     }
 });
 router.patch('/:id',async(req,res, next)=>{
     const {params:{id},body}=req;
     try{
         const users =await editOne(id, body);
         res.json(users);
     }
     catch(e){
         next(e);
     }
 });


 router.post('/follow/:fid',async(req,res,next)=>{
    const { params: { fid },user: { id } } = req;
    // debugger
    try {
    const userfollowID = await addfollow(id,fid);
    res.json(userfollowID);
    } catch (e) {
    next(e);
    }
    });


    router.post('/follow/:fid',async(req,res,next)=>{
        const { params: { fid },user: { id } } = req;
        // debugger
        try {
        const userfollowID = await unfollow(id,fid);
        res.json(userfollowID);
        } catch (e) {
        next(e);
        }
        });


 module.exports=router;