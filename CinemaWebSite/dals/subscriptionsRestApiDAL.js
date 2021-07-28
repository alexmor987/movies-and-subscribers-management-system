const axios=require('axios');
/**
 * Get All Subscriptions from REST API
 * @returns Promise with data of All Subscriptions
 */
exports.getAll=(url)=>{
     return axios.get(url);
}
/**
 * Get  Subscription by id from REST API
 * @returns Promise with data
 */
exports.getById=(id,url)=>{
      return axios.get(url+id);
}
/**
 * 
 * @param {*} id  Subscription update by id In SubscriptionWS
 * @param {*} obj Subscriber data to Update
 * @returns status Updated! OR ERROR if not
 */
exports.update=(id,obj,url)=>{
    return axios.put(url+id,obj);
}
/**
 * Add a subscription To SubscriptionWS
 * @param {*} obj Subscriber data to Add
 * @returns Status-Created with id If add was successful OR ERROR if not
 */
exports.add=(obj,url)=>{
    return axios.post(url,obj);
}
/**
 *  Delete a subscription from SubscriptionWS
 * @param {*} id  delete subscription by id from SubscriptionWS
 * @returns Status-Deleted! If delete was successful OR ERROR if not
 */
exports.delete=(id,url)=>{
   return axios.delete(url+id);
}
