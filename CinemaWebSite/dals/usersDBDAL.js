const usersJsonDAL=require ('./usersJsonDAL');
const User=require('../models/usersModel');

exports.getUsers=()=>
{
    return new Promise(async(resolve,reject)=>
    {
        User.find({},(err,data)=>{
          if(err)reject(err);
          else resolve(data);
     })
       });
}
/**
 * Get  user by id from DB
 * @returs movie from DB -movies collection
 */
 exports.getUserById=(id)=>{
  return new Promise((resolve,reject)=>
  {
     User.findById(id,(err,data)=>{
        if(err)reject(err);
        else resolve(data);
   })
     });
}

exports.updateUserPwd=(id,pwd)=>
{
  return new Promise((resolve,reject)=>
  {
     User.findByIdAndUpdate(id,
     {
      Password:pwd
     },(err)=>{
        if(err)reject(err);
        else resolve("Updated!");
     });
  });
}
exports.updateUser=(obj)=>
{
  return new Promise((resolve,reject)=>
  {
     User.findByIdAndUpdate(obj.userid,
     {
        UserName:obj.username
     },(err)=>{
        if(err)reject(err);
        else resolve("Updated!!!");
     });
  });
}
exports.addUser= (obj)=>{
   return new Promise((resolve,reject)=>
   {
     let user=new User({
      UserName: obj.username,
      Password:"1",
      isAdmin:false
      })
      user.save(err=>{
         if(err)reject(err);
         else resolve(user._id);
    })
      });
}
exports.deleteUser= (id)=>{
   return new Promise((resolve,reject)=>
   {
     User.findByIdAndDelete(id,(err,data)=>{
         if(err)reject(err);
         else resolve("Deleted!");
    })
      });
}