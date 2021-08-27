
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');//to get movies 
const subscriptionsBL= require('../models/subscriptionsBL');
const membersBL= require('../models/membersBL');
const MoviesURL='http://localhost:8000/api/movies/';//URL to Subscriptions WS->movies collection



/**
 * 
 * @returns  all movies in a list. Each movie has it’s name, year, image, and a list of
all the subscriptions that watched that movies (name + year)
 */
exports.getAllMovies=async()=>
{
 let allMovies=await subscriptionsRestAPI.getAll(MoviesURL);
 let movies=allMovies.data.map(async x=>{
     return { movieid:x._id,
              moviename:x.Name,
              genres:x.Genres,
              image:x.Image,
              premiered:x.Premiered,
              subscriptions: await findSubscriptions(x._id)

     }
 })
 const moviesData = await Promise.all(movies);

  return moviesData; 
}
/**
 * 
 * @returns  all movies in a list. Each movie has it’s name, year, image, Without subscribers.
 */
exports.getMovies=async()=>
{
 let allMovies=await subscriptionsRestAPI.getAll(MoviesURL);
  return allMovies.data;
}
exports.searchMovies=async(obj)=>
{
        let allMovies=await this.getAllMovies();
        let result= allMovies.filter(x=>{
          return ( isSameNames(x.moviename,obj.moviename) || obj.moviename==="");
        })
        return result;
}
exports.searchMovieById=async(movieid)=>
{
        let arrResult=[];
        let allMovies=await this.getAllMovies();
        let result= allMovies.find(x=>x.movieid===movieid);
        
        arrResult.push(result);
       
        return arrResult;
}
exports.addMovie=async(obj)=>
{
        let status=await subscriptionsRestAPI.add(obj,MoviesURL);
        
        return status;
}
exports.deleteMovie=async(id)=>
{
        await subscriptionsRestAPI.delete(id,MoviesURL);
        await subscriptionsBL.deleteMovieForSubscribers(id);
        
}
exports.updateMovie=async(obj)=>
{
        await subscriptionsRestAPI.update(obj.movieid,obj,MoviesURL);       
}
exports.getMovieById=async(id)=>
{
 let movie=await subscriptionsRestAPI.getById(id,MoviesURL);
  return movie.data; 
}
exports.getGenersList=async ()=>{
  let allMovies=await subscriptionsRestAPI.getAll(MoviesURL);
  let data=allMovies.data;
  let result= data.map(x=>x.Genres)
  var mySet = new Set();
  result.forEach(element => {
    if(Array.isArray(element))
    {
      element.forEach(x => {
         mySet.add(x);
          });
    }
    else
    { 
      mySet.add(element);
    }
  });
 
  return mySet;
}
function isSameNames (x,y){
  
    return x.toLowerCase().includes(y.toLowerCase());  
}
async function findSubscriptions(movieid){
    let allSubscriptions=await subscriptionsBL.getAllSubscriptions();
    let subscriptions=allSubscriptions.filter(x=>{
         return x.Movies.find(x=>x.movieId===movieid);
        });

        let data=subscriptions.map(async x=>{
            
            return { _id:x.MemberId,
                     date: findDateWatch(x.Movies,movieid),
                     name:await findNameSubscriptions(x.MemberId)
            }
        });
    const subscriptionsData = await Promise.all(data);
        
    return subscriptionsData;
}
async function findNameSubscriptions(id){
    let allMembers=await membersBL.getAllMembers();
    let data=allMembers.find(x=>x._id===id);

    return data.Name;

}
function findDateWatch(arrMovies,movieid){

   
   let arrDate =arrMovies.filter(y=>{if(y.movieId===movieid) return y.date;});

   return arrDate[0].date

 }
//this.searchMovieById('611ad0742d287441d433ce61');