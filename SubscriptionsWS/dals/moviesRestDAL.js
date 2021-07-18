const axios=require('axios');

/**
 * Get All movies from REST API
 * @returns data of All movies
 */
exports.getAllMovies=()=>{
     return axios.get('https://api.tvmaze.com/shows');
}
