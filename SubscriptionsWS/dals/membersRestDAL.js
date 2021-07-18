const axios=require('axios');
/**
 * Get All members from REST API
 * @returns data of All members
 */
exports.getAllMembers=()=>{
     return axios.get('https://jsonplaceholder.typicode.com/users');
}
