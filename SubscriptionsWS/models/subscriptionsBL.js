let Subscription=require('../models/subscriptionsModel');

/**
 * Get all Subscriptions from DB
 * @returns Subscriptions from DB -subscription collection
 */
 exports.getAllSubscriptions=()=>{
   return new Promise((resolve,reject)=>
   {
    Subscription.find({},(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Get  Subscription by id from DB
 * @returns Subscription from DB -subscriptions collection
 */
 exports.getSubscription=(id)=>{
   return new Promise((resolve,reject)=>
   {
    Subscription.findById(id,(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Add  Subscription to DB.
 * @returns  status created or error if not created.
 */
 exports.addSubscription= (obj)=>{
   return new Promise((resolve,reject)=>
   {
     let subscription=new Subscription({
        MemberId: obj.MemberId,
        Movies:obj.Movies
      })
      subscription.save(err=>{
         if(err)reject(err);
         else resolve("Created with id:"+subscription._id);
    })
      });
}

/**
 * Update  Subscription from subscriptions collection
 * @returns  status Updated or error if not Updated.
 */
 exports.updateSubscription=(id,obj)=>{
  return new Promise((resolve,reject)=>
  {
    Subscription.findByIdAndUpdate(id,{
        MemberId: obj.MemberId,
        Movies:obj.Movies
      },(err)=>{
        if(err)reject(err);
        else resolve("Updated!");
     });
  });
}
/**
* Delete  Subscription from subscription collection
* @returns  status Deleted or error if not Deleted.
*/
exports.deleteSubscription=(id)=>{
  return new Promise((resolve,reject)=>
  {
    Subscription.findByIdAndDelete(id,(err,data)=>{
        if(err)reject(err);
        else resolve("Deleted!");
   })
     });
}