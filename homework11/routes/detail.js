var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    req.user.title = "用户信息";
    res.render('detail', req.user);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
