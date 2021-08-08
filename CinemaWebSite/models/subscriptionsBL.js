const { all } = require('../controllers/login');
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const URL='http://localhost:8000/api/subscriptions/';//URL to Subscriptions WS->subscriptions collection

exports.getAllSubscriptions=async()=>
{
 let allSubscriptions=await subscriptionsRestAPI.getAll(URL);
 return allSubscriptions.data;
}
