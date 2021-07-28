const usersJsonDAL=require ('../dals/usersJsonDAL');
const User=require('../models/usersModel');

exports.getAllUsers=()=>
{
    return new Promise(async(resolve,reject)=>
    {
        User.find({},(err,data)=>{
          if(err)reject(err);
          else resolve(data);
     })
       });
}