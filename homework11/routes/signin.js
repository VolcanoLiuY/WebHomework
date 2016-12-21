var express = require('express');
var router = express.Router();
var userModel = require("../model/userModel");

router.get('/', function(req, res, next) {
  if (req.query.username && req.user) {
    req.user.title = "用户信息";
    if (req.query.username !== req.user.username) {
      req.user.error = "只能够访问自己的数据";
    }
    res.render('detail', req.user);
  }
  else if (req.user) {
    res.redirect("/detail");
  } else{
    res.render('signin',{title:"登录"});
  }
});

router.post("/", function(req, res, next) {
  userModel.login(req.body.username, req.body.password)
  .then(function(doc) {
    res.cookie("token", doc.hash, {maxAge: 86400000});
    res.send({path:"/detail"});
  })
  .catch(err=>res.send({error:err.message}));
});

router.post("/logout", function(req, res, next) {
  res.clearCookie("token");
  res.send({path:"/"});
});

module.exports = router;