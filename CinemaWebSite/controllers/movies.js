var express = require('express');
var router = express.Router();
const moviesBL= require('../models/moviesBL');

router.get('/',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     let allMovies=await  moviesBL.getAllMovies();
     let generslist=await  moviesBL.getGenersList();
      res.render('movies',{isAdmin:req.session.isAdmin,username:req.session.username,
        data:allMovies,msg:"",pageAddMovie:false,generslist:generslist});
   }
  else
  {
      res.redirect("/login");
  }
});
/**
 * 
/* GET- ADD Movies Page. */
router.get('/addMovie',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     let generslist=await  moviesBL.getGenersList();
     let allMovies=await  moviesBL.getAllMovies();
      res.render('addMovie',{isAdmin:req.session.isAdmin,username:req.session.username,data:allMovies,msg:"",pageAddMovie:true,generslist:generslist});
   }
  else
  {
      res.redirect("/login");
  }
  
});
/**
 * 
/* POST- ADD Movies Page. */
router.post('/addMovie',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     await  moviesBL.addMovie(req.body);
      res.redirect('/movies');
   }
  else
  {
      res.redirect("/login");
  }
  
});
/* POST- Search Movies Page. */
router.post('/searchMovies',async function(req, res, next) {
  if(req.session.isAuthenticated) {
      let resultOfSearchMovies=await moviesBL.searchMovies(req.body);
      let generslist=await  moviesBL.getGenersList();
      res.render('movies',{isAdmin:req.session.isAdmin,username:req.session.username,
        data:resultOfSearchMovies,msg:"No data found!",pageAddMovie:false,generslist:generslist});
      
    }
  else
    {
    res.redirect('/login');
    }
  
});
router.get('/searchMovies/:id',async function(req, res, next) {
  if(req.session.isAuthenticated) {
      let result=await moviesBL.searchMovieById(req.params.id);
      let generslist=await  moviesBL.getGenersList();
      
      
      res.render('movies',{isAdmin:req.session.isAdmin,username:req.session.username,
        data:result,msg:"",pageAddMovie:false,generslist:generslist});
      
    }
  else
    {
    res.redirect('/login');
    }
  
});
router.get('/deleteMovie/:id',async function(req, res, next) {
  if(req.session.isAuthenticated) {
      await moviesBL.deleteMovie(req.params.id);
      res.redirect('/movies');
      
    }
  else
    {
    res.redirect('/login');
    }
  
});
router.get('/updateMovie/:id',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     let movieData=await moviesBL.getMovieById(req.params.id);
     return res.json(movieData);
   }
  else
  {
      res.redirect("/login");
  }
  
});
/* POST- Update Movie. */
router.post('/updateMovie',async function(req, res, next) {
  if(req.session.isAuthenticated) {
      await moviesBL.updateMovie(req.body);
      res.redirect('/movies');  
    }
  else
    {
    res.redirect('/login');
    }
  
});
module.exports = router;
