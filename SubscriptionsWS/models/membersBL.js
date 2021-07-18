const membersDAL=require('../dals/membersRestDAL');
const Member=require('../models/membersModel');

/**
 * Get all members from DB
 * @returns members from DB -members collection
 */
 exports.getAllMembers=()=>{
   return new Promise((resolve,reject)=>
   {
      Member.find({},(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Get  member by id from DB
 * @returns members from DB -members collection
 */
 exports.getMember=(id)=>{
   return new Promise((resolve,reject)=>
   {
      Member.findById(id,(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Add  member to DB.
 * @returns  status created or error if not created.
 */
 exports.addMember= (obj)=>{
   return new Promise((resolve,reject)=>
   {
     let member=new Member({
         Name: obj.Name,
         Email:obj.Email,
         City:obj.City
      })
      member.save(err=>{
         if(err)reject(err);
         else resolve("Created with id:"+member._id);
    })
      });
}
/**
 * Update  member from members collection
 * @returns  status Updated or error if not Updated.
 */
exports.updateMember=(id,obj)=>{
   return new Promise((resolve,reject)=>
   {
      Member.findByIdAndUpdate(id,
      {
         Name: obj.Name,
         Email:obj.Email,
         City:obj.City
      },(err)=>{
         if(err)reject(err);
         else resolve("Updated!");
      });
   });
}
/**
 * Delete  member from members collection
 * @returns  status Deleted or error if not Deleted.
 */
 exports.deleteMember=(id)=>{
   return new Promise((resolve,reject)=>
   {
      Member.findByIdAndDelete(id,(err,data)=>{
         if(err)reject(err);
         else resolve("Deleted!");
    })
      });
}
/**
 * When the REST API server starts, it pulled all the data from the external members web service
and populated the relevant data in the relevant collection ( members collection) in the
Subscriptions DB ( a MongoDB data base).
 * @returns id's of members created
 */
exports.populateMembersCollection=async ()=>
{
   return new Promise(async(resolve,reject)=>
   {
      let allMembers=await membersDAL.getAllMembers();
      let allMembersData=allMembers.data;
      allMembersData.forEach(element => {
         let member=new Member({
            Name: element.name,
            Email:element.email,
            City:element.address.city
         })
         member.save(err=>
            {
               if(err) reject(err);
               else resolve('Created with ids:' + member._id);
            })
      });

   })
  

}
