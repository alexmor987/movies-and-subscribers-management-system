var express = require('express');
var router = express.Router();
const loginBL = require('../models/loginBL');

/* GET login Page. */
router.get('/', function(req, res, next) {
  res.render('login',{msg:''});
});

/* Authenticated User from users collection */
router.post('/login',async function(req, res, next) {
  let isUserDataVerified= await loginBL.loginAuthentication(req.body.username,req.body.password);
  if ( typeof isUserDataVerified ==='object'){
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
  console.log(status);
  res.render('login',{msg:'Password updated successfully!'});
  }
  res .render('createAccount',{msg:'User does not exist!'});
});
module.exports = router


/*


const express = require('express');
const jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/login', function(req, res) {
    
    const username = req.body.username;
    const password = req.body.password;

    //if (validateEmailAndPassword()) {
    if (true) 
    {
       //const userId = findUserIdForUserName(username);
        const userId = "someuserid";
       
       //Get the real secret key from db or envinroment variable..
        const RSA_PRIVATE_KEY = 'somekey';

        var tokenData = jwt.sign({ id: userId },
                             RSA_PRIVATE_KEY,
                            {expiresIn: 7200  } // expires in 2 hours
                            );
        res.status(200).send({ token: tokenData });
    }
    else
    {
        res.sendStatus(401); 
    }

  });

  module.exports = router;
*/