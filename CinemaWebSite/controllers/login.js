var express = require('express');
var router = express.Router();
const loginBL = require('../models/loginBL');
const usersBL = require('../models/usersBL');



/* GET login Page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('login',{msg:''});
});

/* Authenticated User from users collection */
router.post('/login',async function(req, res, next) {
  let isUserDataVerified= await loginBL.loginAuthentication(req.body.username,req.body.password);
  if ( typeof isUserDataVerified ==='object'){
      
      if(!isUserDataVerified.isAdmin){
        let userData=await usersBL.getUserById(isUserDataVerified._id);
        req.session.cookie.maxAge=(userData.sessionTimeOut*60000) ;//sessionTimeOut in min.
    }
      req.session["isAuthenticated"]=true;
      req.session["username"]=isUserDataVerified.UserName;
      req.session["isAdmin"]=isUserDataVerified.isAdmin;
      res.redirect('/menu');
      }
      else
      {
        res .render('login',{msg:'UserName  or password are wrong!'});
      }
});
/* GET createAccount Page. */
router.get('/createAccount', function(req, res, next) {
  res.render('createAccount',{msg:""});
});
/* POST createAccount Page. */
router.post('/createAccount',async function(req, res, next) {
  let isUserDataVerified= await loginBL.usernameAuthentication(req.body.username);
  if ( typeof isUserDataVerified ==='object'){
  let status=await loginBL.passwordUpdate(isUserDataVerified._id,req.body);
  res.render('login',{msg:'Password updated successfully!'});
  }
  res .render('createAccount',{msg:'User does not exist!'});
});
module.exports = router
