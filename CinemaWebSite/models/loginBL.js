const usersJsonDAL=require ('../dals/usersJsonDAL');
const usersDBDAL=require('../dals/usersDBDAL');


exports.getAllUsers=async()=>
{
  let allUsers= await usersDBDAL.getUsers();

  return allUsers;
    
}

exports.loginAuthentication=async(username,pwd)=>
{
       let allusers=await usersDBDAL.getUsers();
       let userdata= allusers.find(x=>x.UserName===username && x.Password===pwd);
        return userdata;    
}
exports.usernameAuthentication=async(username)=>
{
       let allusers=await usersDBDAL.getUsers();
       let userdata= allusers.find(x=>x.UserName===username);
      return userdata;    
}

exports.passwordUpdate=async(userid,obj)=>
{
      let status= await usersDBDAL.updateUserPwd(userid,obj.password);
      return status;
}
//this.loginAuthentication("admin","2");