const express=require('express');
const membersBL=require('../models/membersBL');
const moviesBL=require('../models/moviesBL');
const router=express.Router();


//Get all requests 
router.route('/').get(async function(req,res)
{
let allMembers=await membersBL.getAllMembers();
return res.json(allMembers);
})

module.exports=router;