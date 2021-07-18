const { all } = require('../controllers/subscriptionsController');
const moviesDAL=require('../dals/moviesRestDAL');
const Movies=require('../models/moviesModel');
/**
 * Get All movies from DB
 * @returns movies from DB -movies collection
 */
exports.getAllMovies=async ()=>{
   return new Promise(async(resolve,reject)=>
   {
    Movies.find({},(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * When the REST API server starts, it pulled all the data from the external movies web service
and populated the relevant data in the relevant collection ( Movies collection) in the
Subscriptions DB ( a MongoDB data base).
 * @returns id's of movies created
 */
exports.populateMoviesCollection=async ()=>
{
   return new Promise(async(resolve,reject)=>
   {
      let allMovies=await moviesDAL.getAllMovies();
      let allMoviesData=allMovies.data;
      allMoviesData.forEach(element => {
         let movie=new Movies({
            Name: element.name,
            Genres:element.genres,
            Image:element.image.medium,
            Premiered:element.premiered
         })
         movie.save(err=>
            {
               if(err) reject(err);
               else resolve('Created with ids:' + movie._id);
            })
      });

   })
  

}

