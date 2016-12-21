var express = require('express');
var router = express.Router();
var jsSHA = require("jssha");
var validator = require("../public/javascripts/validator");
var userModel = require("../model/userModel");

var HMAC = {
  get(text, key) {
    var shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    shaObj.update(text);
    return shaObj.getHMAC("HEX");
  }
};

var nameTable = {
  username: "用户名",
  password: "密码",
  sid: "学号",
  phone: "电话",
  email: "邮箱"
};

router.get('/', function(req, res, next) {
  res.render('regist', {title:"注册"});
});

router.post("/", function(req, res, next) {
  var user = req.body;
  var promise = Promise.resolve();
  for (var field in user) {
    promise = promise.then(function() {
      var message = validator.check(field, user[field]);
      if (message)
        return Promise.reject(new Error(nameTable[field]+message));
      else
        return Promise.resolve();
    });
    if (field !== "password")
      promise = promise.then(()=>userModel.checkField(field, user[field]));
  }
  promise.then(function() {
    user.hash = HMAC.get(user.username, user.password);
    return userModel.regist(user);
  }).then(function() {
    res.cookie("token", user.hash, {maxAge: 86400000});
    res.send({path:"/detail"});
  }).catch(error=>res.send({error:error.message}));
});

module.exports = router;