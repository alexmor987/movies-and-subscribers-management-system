const { all } = require('../controllers/loginController');
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const URL='http://localhost:8000/api/movies/';//URL to Subscriptions WS->movies collection


exports.getAllMovies=async()=>
{
 let allMovies=await subscriptionsRestAPI.getAll(URL);
 return allMovies.data; 
}
