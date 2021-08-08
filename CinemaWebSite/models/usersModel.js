let mongoose=require('mongoose');

let UsersSchema=new mongoose.Schema({
    UserName:String,
    Password:String ,   
    isAdmin:Boolean    
    });
module.exports=mongoose.model('users',UsersSchema);