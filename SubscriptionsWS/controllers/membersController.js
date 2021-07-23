const express=require('express');
const membersBL=require('../models/membersBL');
const router=express.Router();


//Get all members 
router.route('/').get(async function(req,res)
{
let allMembers=await membersBL.getAllMembers();
return res.json(allMembers);
})
//Get  member by id
router.route('/:id').get(async function(req,res)
{
let member=await membersBL.getMember(req.params.id);
return res.json(member);
})
//Add  member 
router.route('/').post(async function(req,res)
{
let status=await membersBL.addMember(req.body);
return res.json(status);
})
//Update  member by id 
router.route('/:id').put(async function(req,res)
{
let status=await membersBL.updateMember(req.params.id,req.body);
return res.json(status);
})
//Delete  member by id
router.route('/:id').delete(async function(req,res)
{
let status=await membersBL.deleteMember(req.params.id);
return res.json(status);
})
module.exports=router;