var config = require("../config/config");
var mongoose = require("mongoose");


mongoose.Promise = global.Promise;
 
var nameTable = {
  username: "用户名",
  password: "密码",
  sid: "学号",
  phone: "电话",
  email: "邮箱"
};

var userModel = {
  uModel: undefined,
  findUser(field, content) {
    var condition = {};
    condition[field] = content;
    return this.uModel.findOne(condition).exec()
                .catch(err=>Promise.reject(new Error("服务器出现错误")));
  },
  login(username, password) {
    return this.findUser("username", username).then(function(doc) {
      if (!doc)
        return Promise.reject(new Error("未找到该用户"));
      else if (doc.password !== password)
        return Promise.reject(new Error("用户名或密码错误"));
      else
        return Promise.resolve(doc);
    });
  },

  checkField(field, content) {
    return this.findUser(field, content).then(function(doc) {
      if (!doc)
        return Promise.resolve();
      else
        return Promise.reject(new Error(nameTable[field]+"已存在"));
    });
  },
  regist(user) {
    return this.uModel.create(user)
            .catch(err=>Promise.reject(new Error("服务器出现错误")));
  }
};

mongoose.connect(config.dbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("Mongoose Run! Connected to " + config.dbURL);
  console.log("--------------------------------------");
  var uSchema = new mongoose.Schema({
    username: String,
    password: String,
    sid: String,
    phone: String,
    email: String,
    hash: String
  });
  userModel.uModel = mongoose.model("User", uSchema, "users");
});

module.exports = userModel;