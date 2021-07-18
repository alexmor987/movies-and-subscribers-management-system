const mongoose=require('mongoose');
const moviesBL=require('../models/moviesBL');
const membersBL=require('../models/membersBL');
mongoose.connect('mongodb://localhost:27017/subscriptionsDB');

membersBL.getAllMembers().then(value=>
    {
        /**
         * Check if there are values within a members Collection,
         * if not populate it when the server goes up
         */
    if(value.length===0)
    {
       membersBL.populateMembersCollection();
    }
   
    });
moviesBL.getAllMovies().then(value=>{
     /**
    * Check if there are values within a movies Collection, 
    * if not populate it when the server goes up
    */
    if(value.length===0)
    {
      moviesBL.populateMoviesCollection();
    }
});







