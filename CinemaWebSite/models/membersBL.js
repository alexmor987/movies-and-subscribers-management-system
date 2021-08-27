
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const subscriptionsBL= require('../models/subscriptionsBL');
const moviesBL= require('../models/moviesBL');
const URL='http://localhost:8000/api/members/';//URL to Subscriptions WS->members collection
const MoviesURL='http://localhost:8000/api/movies/';//URL to Subscriptions WS->movies collection

exports.getAllMembers=async()=>
{
 let allMembers=await subscriptionsRestAPI.getAll(URL);

 return allMembers.data;
}
exports.searchMemberById=async(memberid)=>
{
 let arr=[];
 let allMembers=await this.getAllMembersWithWatchingMovies();
 let searchMember=allMembers.find(x=>x.memberid===memberid);
 arr.push(searchMember);
 return arr;
}
exports.getAllMembersWithWatchingMovies=async()=>
{
  let allMembers=await this.getAllMembers();
  let members=allMembers.map(async x=>{
  return {memberid:x._id,
           Name:x.Name,
           City:x.City,
           Email:x.Email,
           Movies:await findWatchedMovies(x._id)
        }
    })
    const result = await Promise.all(members);
    
    return result; 
}
exports.deleteMember=async(id)=>
{
   await subscriptionsRestAPI.delete(id,URL);
   let allSubscriptions=await subscriptionsBL.getAllSubscriptions();
   let subscriptionToDelete=allSubscriptions.find(x=>x.MemberId===id);
   if(subscriptionToDelete){
    await subscriptionsBL.deleteSubscription(subscriptionToDelete._id);
   }
  
}
exports.updateMember=async(obj)=>
{
   await subscriptionsRestAPI.update(obj.memberid,obj,URL);
}
exports.createMember=async(obj)=>
{
   await subscriptionsRestAPI.add(obj,URL);
}
async function findWatchedMovies(memberid){
    let allSubscriptions=await subscriptionsBL.getAllSubscriptions();
    let subscription=allSubscriptions.find(x=>x.MemberId===memberid);
   if(typeof subscription ==='object'){
    let data= subscription.Movies.map(async x=>{

        return {
            movieId:x.movieId,
            date:x.date,
            name:await findMovieName(x.movieId)
        };

     });
     const result = await Promise.all(data);
    
     return result; 
    }
    return [];
     
}
async function findMovieName(movieid){
   let allMovies=await subscriptionsRestAPI.getAll(MoviesURL);
   let movieById=allMovies.data.find(x=>x._id===movieid);
   return movieById.Name;
}
this.getAllMembers();
