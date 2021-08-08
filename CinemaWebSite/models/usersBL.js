// require('../configs/database');
const usersDBDAL= require('../dals/usersDBDAL');
const usersJsonDAL= require('../dals/usersJsonDAL');
const permissionsJsonDAL= require('../dals/permissionsJsonDAL');


exports.getAllUsers=async()=>{
    let allUsersFromjson=await usersJsonDAL.getUsers();

    let allUsers=allUsersFromjson.users.map(async (x)=>{
       return {userid:x.id,fullname:x.Fname+" "+x.Lname,
                    username:await(getUsernameById(x.id)),
                    isAdmin:await (isAdminById(x.id)),
                    sessionTimeOut:x.SessionTimeOut,
                    permissions:await (getPermissionsById(x.id))
               };
    });
    const users = await Promise.all(allUsers);
    return users;
}
exports.getUserById=async(id)=>
{
   let allUsersFromjson=await usersJsonDAL.getUsers();
   
   let user=allUsersFromjson.users.find(x=>x.id===id);
  
   let data={userid:user.id,fullname:user.Fname+" "+user.Lname,
                   email:user.Email,
                   username:await(getUsernameById(user.id)),
                   isAdmin:await (isAdminById(user.id)),
                   sessionTimeOut:user.SessionTimeOut,
                   CreatedDate:user.CreatedDate,
                   permissions:await (getPermissionsById(user.id))
              };
   return data;
}
exports.createUser=async(obj)=>
{
/**
 * 
 * 
 * [Object: null prototype] {
  fname: 'alex',
  lname: 'mor',
  username: 'all',
  email: 'mi@aa.com',
  sessiontime: '60',
  permessions: [ 'View Movies', 'Create Movies', 'Delete Movies' ]
}
 */

   let userIdFromDb=await usersDBDAL.addUser(obj);

   let newUserToJson={
      id:userIdFromDb.toString(),
      Fname:obj.fname,
      Email: obj.email,
      Lname:obj.lname,
      CreatedDate:(new Date()).toISOString(),
      SessionTimeOut:parseInt(obj.sessiontime)

   };
   let allUsersFromjson=await usersJsonDAL.getUsers();
   allUsersFromjson.users.push(newUserToJson);
   usersJsonDAL.createUser(allUsersFromjson) ;

   let newUserPermissionsToJson={
      id:userIdFromDb.toString(),
      permissions:obj.permissions
   }

   let allUsersPermissionsFromjson=await permissionsJsonDAL.getUsersPermissions();
   allUsersPermissionsFromjson.permissions.push(newUserPermissionsToJson);
   permissionsJsonDAL.createUserPermissions(allUsersPermissionsFromjson) ;

   //console.log(allUsersPermissionsFromjson);


  // console.log(allUsersFromjson);

}
exports.updateUser=async(obj)=>
{
   await usersDBDAL.updateUser(obj);

   let allusers=await usersJsonDAL.getUsers();
        let idsFromUsersJson =allusers.users.map(x=>x.id);
        let indexOfIdFromUsersJson=idsFromUsersJson.indexOf(obj.userid); 

      allusers.users[indexOfIdFromUsersJson]={
      id:obj.userid,
      Fname:obj.fname,
      Email: obj.email,
      Lname:obj.lname,
      CreatedDate:obj.CreatedDate,
      SessionTimeOut:parseInt(obj.sessiontime)
   };
   usersJsonDAL.createUser(allusers) ;

   let allusersPermissions=await permissionsJsonDAL.getUsersPermissions();
        let idsFromPermissionsJson =allusersPermissions.permissions.map(x=>x.id);
        let indexOfIdFromPermissionsJson=idsFromPermissionsJson.indexOf(obj.userid); 

        allusersPermissions.permissions[indexOfIdFromPermissionsJson]={
             id:obj.userid,
             permissions:obj.permissions
   }

   permissionsJsonDAL.createUserPermissions(allusersPermissions) ;
}
exports.deleteUser=async(id)=>
{
   await usersDBDAL.deleteUser(id);

   let allusers=await usersJsonDAL.getUsers();
   let ids =allusers.users.map(x=>x.id);
   let indexOfId=ids.indexOf(id);  
   if (indexOfId > -1) {
      allusers.users.splice(indexOfId,1);
   }
   usersJsonDAL.createUser(allusers);

   let allusersPermissions=await permissionsJsonDAL.getUsersPermissions();
   let idsFromPermissionsJson =allusersPermissions.permissions.map(x=>x.id);
   let index=idsFromPermissionsJson.indexOf(id);  
   if (indexOfId > -1) {
      allusersPermissions.permissions.splice(index,1);
   }
   permissionsJsonDAL.createUserPermissions(allusersPermissions);

}
 async function getUsernameById(id){
    let user=await usersDBDAL.getUserById(id);
    return  user.UserName; 
 }
 async function getPermissionsById(id){
    let allUsersPermissions=await permissionsJsonDAL.getUsersPermissions();
    let userPermissions=allUsersPermissions.permissions.find(x=>x.id===id);
    return userPermissions.permissions;   
 }
 async function isAdminById(id){
    let user=await usersDBDAL.getUserById(id);
    return  user.isAdmin; 
 }

 //this.deleteUser("60fd3ac0285bf555eabf6fa0");