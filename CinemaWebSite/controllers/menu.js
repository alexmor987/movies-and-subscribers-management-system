var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.isAuthenticated)
  {
      res.render('menu',{isAdmin:req.session.isAdmin,username:req.session.username});
  }
  else
  {
      res.redirect("/login");
  }
  
});

module.exports = router;
