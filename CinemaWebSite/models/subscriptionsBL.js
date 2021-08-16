
const subscriptionsRestAPI= require('../dals/subscriptionsRestApiDAL');
const URL='http://localhost:8000/api/subscriptions/';//URL to Subscriptions WS->subscriptions collection

exports.getAllSubscriptions=async()=>
{
 let allSubscriptions=await subscriptionsRestAPI.getAll(URL);
 return allSubscriptions.data;
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
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}