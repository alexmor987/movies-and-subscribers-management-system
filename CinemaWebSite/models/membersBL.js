const { all } = require('../controllers/loginController');
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const URL='http://localhost:8000/api/members/';//URL to Subscriptions WS->members collection


exports.getAllMembers=async()=>
{
 let allMembers=await subscriptionsRestAPI.getAll(URL);
 return allMembers.data;
}
