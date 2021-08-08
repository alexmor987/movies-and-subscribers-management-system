const jsonfile=require('jsonfile');

/**
*Get All Users permissions  from permissions.json file
 * @returns Promise with data of All Users permissions
 */
exports.getUsersPermissions=() =>
{
    return new Promise((resolve,reject)=>
    {
        jsonfile.readFile(__dirname+"/permissions.json",(err,obj)=>
        {
            if(err) reject(err);
            else resolve(obj);
    })
})
}
/**
 * 
* Add a Users permissions To permissions.json file
 * @param {*} obj Users permissions data to Add
 * @returns  ERROR if not created
 */
exports.createUserPermissions=(obj)=>{
   return new Promise (async reject=>{
    jsonfile.writeFile(__dirname+"/permissions.json",obj,(err) =>
    {
        if (err) reject(err);
     })

   })
    
}