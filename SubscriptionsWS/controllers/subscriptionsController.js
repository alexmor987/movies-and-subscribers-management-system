const express=require('express');
const subscriptionsBL=require('../models/subscriptionsBL');
const router=express.Router();


//Get all Subscriptions 
router.route('/').get(async function(req,res)
{
let allSubscriptions=await subscriptionsBL.getAllSubscriptions();
return res.json(allSubscriptions);
})
//Get Subscription by id
router.route('/:id').get(async function(req,res)
{
let subscription=await subscriptionsBL.getSubscription(req.params.id);
return res.json(subscription);
})
//Add  Subscription 
router.route('/').post(async function(req,res)
{
let status=await subscriptionsBL.addSubscription(req.body);
return res.json(status);
})
//Update  Subscription by id 
router.route('/:id').put(async function(req,res)
{
let status=await subscriptionsBL.updateSubscription(req.params.id,req.body);
return res.json(status);
})
//Delete  Subscription by id
router.route('/:id').delete(async function(req,res)
{
let status=await subscriptionsBL.deleteSubscription(req.params.id);
return res.json(status);
})
module.exports=router;