const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema}= mongoose;
const userSchema = Schema({
    name:{
        type: String,
        maxLength : 160,
        required : true
    },
    username:{
        type:String,
        unique : true,
        maxLength : 160,
        required : true
    },
    password:{
        type: String,
        minLength : 8,
        maxLength : 160,
        required: true
    },
    dob : Date,
    Follower :[{ type : Schema.ObjectId, ref : 'User'}]
},


{
    toJSON:{
        transform : (doc , ret , option )=>{
            delete ret.password;
            return ret;
        },
    },
});

userSchema.pre('findOneAndUpdate', function preSave(next){
    if(!this._update.password){
        return;
    }
    this._update.password= bcrypt.hashSync(this._update.password , 8);
    next();
});
userSchema.methods.validatePassword = function validatePassword(password){
    return bcrypt.compareSync(password, this.password);
};
const usermodel = mongoose.model('User', userSchema);
module.exports=usermodel



