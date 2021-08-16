const moviesDAL=require('../dals/moviesRestDAL');
const Movie=require('../models/moviesModel');
/**
 * Get All movies from DB
 * @returns movies from DB -movies collection
 */
exports.getAllMovies=()=>{
   return new Promise(async(resolve,reject)=>
   {
    Movie.find({},(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Get  movie by id from DB
 * @returns movie from DB -movies collection
 */
 exports.getMovie=(id)=>{
   return new Promise((resolve,reject)=>
   {
      Movie.findById(id,(err,data)=>{
         if(err)reject(err);
         else resolve(data);
    })
      });
}
/**
 * Add  movie to DB-movies collection
 * @returns  status created or error if not created.
 */
 exports.addMovie= (obj)=>{
   return new Promise((resolve,reject)=>
   {
     let movie=new Movie({
      Name: obj.Name,
      Genres:obj.Genres,
      Image:obj.Image ,
      Premiered:obj.Premiered
      })
      movie.save(err=>{
         if(err)reject(err);
         else resolve("Created with id:"+movie._id);
    })
      });
}
/**
 * Update  movie from movies collection
 * @returns  status Updated or error if not Updated.
 */
exports.updateMovie=(id,obj)=>{
   return new Promise((resolve,reject)=>
   {
      Movie.findByIdAndUpdate(id,
      {
            Name: obj.Name,
            Genres:obj.Genres,
            Image:obj.Image,
            Premiered:obj.Premiered
      },(err)=>{
         if(err)reject(err);
         else resolve("Updated!");
      });
   });
}
/**
 * Delete  movie from movies collection
 * @returns  status Deleted or error if not Deleted.
 */
 exports.deleteMovie=(id)=>{
   return new Promise((resolve,reject)=>
   {
      Movie.findByIdAndDelete(id,(err,data)=>{
         if(err)reject(err);
         else resolve("Deleted!");
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
         let movie=new Movie({
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

