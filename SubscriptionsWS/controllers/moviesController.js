const express=require('express');
const moviesBL=require('../models/moviesBL');
const router=express.Router();


 //Get all movies 
router.route('/').get(async function(req,res)
{
let allMovies=await moviesBL.getAllMovies();
return res.json(allMovies);
})
//Get  movie by id
router.route('/:id').get(async function(req,res)
{
let movie=await moviesBL.getMovie(req.params.id);
return res.json(movie);
})
//Add  movie 
router.route('/').post(async function(req,res)
{
let status=await moviesBL.addMovie(req.body);
return res.json(status);
})
//Update  movie by id 
router.route('/:id').put(async function(req,res)
{
let status=await moviesBL.updateMovie(req.params.id,req.body);
return res.json(status);
})
//Delete  movie by id
router.route('/:id').delete(async function(req,res)
{
let status=await moviesBL.deleteMovie(req.params.id);
return res.json(status);
})
module.exports=router;