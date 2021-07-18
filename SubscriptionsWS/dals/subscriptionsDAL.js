let Subscriptions=require('../models/subscriptionsModel');
/**
 * GET all Subscriptions that exist in a database
 * @returns  DATA with all Subscriptions 
 */
exports.getAllSubscriptions=async()=>{

    return new Promise((resolve,reject)=>
    {
        Subscriptions.find({},(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}
/**
 * GET the Subscription by ID
 * @param {*} id  A unique identification number stored in a database for each Subscription
 * @returns Data for Subscription to which the unique id belongs
 */
exports.getSubscriptionById=async(id)=>{

    return new Promise((resolve,reject)=>
    {
        Subscriptions.findById(id,(err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    })
}
