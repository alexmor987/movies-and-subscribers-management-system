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
      res.render('menu',{ msg: '' ,isAdmin:isUserDataVerified.isAdmin,username:isUserDataVerified.UserName});
      }
      else
      {
        res .render('login',{msg:'UserName  or password are wrong!'});
      }
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