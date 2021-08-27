// require('../configs/database');
const usersDBDAL= require('../dals/usersDBDAL');
const usersJsonDAL= require('../dals/usersJsonDAL');
const permissionsJsonDAL= require('../dals/permissionsJsonDAL');

/**Get all user Data from 3 Data sources,
 * unifies all data into 1 object and passes it to a users.js (controller)
 * @returns All Users Data
 */
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
/**
 * 
 * @param {*} id A unique number stored in usersDB for each user,
 *  and also used as a key that connects 3 sources of Data
 * @returns Returns user by ID
 */
exports.getUserById=async(id)=>
{
   let allUsersFromjson=await usersJsonDAL.getUsers();
   
   let user=allUsersFromjson.users.find(x=>x.id===id.toString());
  
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
/**
 * Creates a new user
 * @param {*} obj All Data about a user coming from a Client
 */
exports.createUser=async(obj)=>
{
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
}
/**
 * Update a user's Data
 * @param {*} obj All Data about the user, which comes from the Client 
 * in order to update a user's Data
 */
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
      SessionTimeOut:obj.isAdmin==='true'?999:parseInt(obj.sessiontime)
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
/**
 * Deletes the user data from 3 Data sources by ID
 * @param {*} id A unique number stored in usersDB for each user,
 *  and also used as a key that connects 3 sources of Data
 */
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

}/**
 * Searches in usersDB the username by ID.
 * @param {*} id A unique number stored in usersDB for each user,
 *  and also used as a key that connects 3 sources of Data.
 * @returns The username by ID.
 */
 async function getUsernameById(id){
    let user=await usersDBDAL.getUserById(id);
    return  user.UserName; 
 }
 /**
 * Searches in permissionsJson the user permissions by ID.
 * @param {*} id A unique number stored in usersDB for each user,
 *  and also used as a key that connects 3 sources of Data.
 * @returns The user permissions by ID.
 */
 async function getPermissionsById(id){
    let allUsersPermissions=await permissionsJsonDAL.getUsersPermissions();
    let userPermissions=allUsersPermissions.permissions.find(x=>x.id===id);
    return userPermissions.permissions;   
 }
 /**
  * Checks if the user is ADMIN or not
  * @param {*} id  A unique number stored in usersDB for each user,
 *  and also used as a key that connects 3 sources of Data.
  * @returns  BOOLEAN value
  */
 async function isAdminById(id){
    let user=await usersDBDAL.getUserById(id);
    return  user.isAdmin; 
 }
