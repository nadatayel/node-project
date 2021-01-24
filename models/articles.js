const Mongoose = require('mongoose');

// const { ObjectId}= Mongoose.Schema.Types;
const { Schema } = Mongoose;
//  const User=require ('./user');
const Article= new Schema({
title:{
    type: String,
    required: true,
},
body:{
    type:String ,
    maxlength:1400,
    required:true,
},
photo:{
    data:Buffer,
    contentType: String,
},
createdAt:{
    type:Date,
    default : new Date()
},
updateAt: Date,
auther:{

    type : Schema.Types.ObjectId,
    ref: 'User',
},
tag: [String],
});

const ArticalModel = Mongoose.model("Artical",Article);
module.exports = ArticalModel;