var userModel = require("./userModel");

const getUser = function(req, res, next){
  var hash = req.cookies.token;
  userModel.findUser("hash", hash)
  .then(doc=>{
    req.user=doc;
    if (doc)
      res.cookie("token", doc.hash, {maxAge: 86400000});
    next();
  }).catch(err=>req.user=null);
};

module.exports = getUser;