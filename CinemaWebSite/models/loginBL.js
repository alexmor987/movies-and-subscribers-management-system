const usersJsonDAL=require ('../dals/usersJsonDAL');
const usersDAL=require('../dals/usersDAL');


exports.getAllUsers=async()=>
{
  let allUsers= await usersDAL.getAllUsers();

  console.log(allUsers);
    
}

exports.loginAuthentication=async(username,pwd)=>
{
       let allusers=await usersDAL.getAllUsers();
       let userdata= allusers.find(x=>x.UserName===username && x.Password===pwd);
        return userdata;    
}


//this.loginAuthentication("admin","2");