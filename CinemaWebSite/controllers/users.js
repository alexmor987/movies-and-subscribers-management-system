var express = require('express');
var router = express.Router();
const usersBL= require('../models/usersBL');

router.get('/',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     let allUsersData=await  usersBL.getAllUsers();
      res.render('manageUsers',{isAdmin:req.session.isAdmin,username:req.session.username,data:allUsersData});
   }
  else
  {
      res.redirect("/login");
  }
  
});
router.get('/updateUser/:id',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
     let userData=await  usersBL.getUserById(req.params.id);
     return res.json(userData);
   }
  else
  {
      res.redirect("/login");
  }
  
});
router.post('/updateUser',async function(req, res, next) {
    await  usersBL.updateUser(req.body);
    res.redirect("/users");
});

router.get('/deleteUser/:id',async function(req, res, next) {
  if(req.session.isAuthenticated){
      await usersBL.deleteUser(req.params.id);
      res.redirect('/users');
    }
    else{
      res.redirect("/login");
    }
  });
router.post('/addUser',async function(req, res, next) {
      await usersBL.createUser(req.body);
      res.redirect('/users');
  });
router.get('/addUser',async function(req, res, next) {
  if(req.session.isAuthenticated)
  {
   res.render('addUser',{isAdmin:req.session.isAdmin,username:req.session.username}); 
  }
  else{
    res.redirect('/login')
  }
  });

module.exports = router;
