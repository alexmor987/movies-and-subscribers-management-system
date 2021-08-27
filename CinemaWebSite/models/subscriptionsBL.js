const moviesBL= require('../models/moviesBL');
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const URL='http://localhost:8000/api/subscriptions/';//URL to Subscriptions WS->subscriptions collection

exports.getAllSubscriptions=async()=>
{
 let allSubscriptions=await subscriptionsRestAPI.getAll(URL);
 return allSubscriptions.data;
}
exports.deleteSubscription=async(id)=>
{
 await subscriptionsRestAPI.delete(id,URL);
}
exports.deleteMovieForSubscribers=async(movieid)=>
{
    let allSubscriptions=await this.getAllSubscriptions();
 
    let subscriptions=allSubscriptions.filter(x=>{
         return x.Movies.find(x=>x.movieId===movieid);
        });
        subscriptions.forEach(async element => {
    let indexOfId=findWithAttr(element.Movies, 'movieId', movieid);  
   if (indexOfId > -1) {
    element.Movies.splice(indexOfId,1);
   }
   if(element.Movies.length>0)
   {
         await subscriptionsRestAPI.update(element._id,element,URL);
   }
    else{
           await subscriptionsRestAPI.delete(element._id,URL);
       
}
    
});

 
}
exports.subscribeOnNewMovie=async(obj)=>
{
    let allSubscriptions=await this.getAllSubscriptions();
    let subscriber=allSubscriptions.find(x=>x.MemberId===obj.memberid);
        if(subscriber){
            let moviesSubscriber=subscriber.Movies
            moviesSubscriber.push(
                {
                    "movieId" :obj.movieid,
                    "date" :obj.date
                })
           
            let updateSubscriber=  {
                _id: subscriber._id,
                MemberId: subscriber.MemberId,
                Movies: moviesSubscriber
              }
             await subscriptionsRestAPI.update(updateSubscriber._id,updateSubscriber,URL);
        }
        else{
            let newSubscriber=  {
                MemberId: obj.memberid,
                Movies: [{
                    "movieId" :obj.movieid,
                    "date" :obj.date
                }]
              }
             await subscriptionsRestAPI.add(newSubscriber,URL);
        }

}
exports.moviesNames=async(memberId)=>
{
    let movies=await moviesBL.getMovies();
    let allSub=await this.getAllSubscriptions();
    let sub= allSub.find(x => x.MemberId===memberId);
    if(sub)
    {
        sub.Movies.forEach(y=>{
            let indexOfMovieId=movies.findIndex(z=>z._id===y.movieId);
                    if (indexOfMovieId > -1) {
                    movies.splice(indexOfMovieId,1); 
                    }
        })
    }
   let moviesData =movies.map(k=>{return {moviename:k.Name,movieid:k._id}});

return moviesData;
}
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}