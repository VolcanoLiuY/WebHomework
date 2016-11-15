var querystring = require("querystring");
var fs=require("fs");

function start(response, postData,database) {
  console.log("Request handler 'start' was called.");

  fs.readFile("./index1.html", function(err, data) {
    if (err) {
      return console.log(err);
    }
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(data);
    response.end();
  });
}


function upload(response, postData, database) {
  console.log("Request handler 'upload' was called.");
  if(isRegister(database, postData)) {
    logIn(response,postData);
  } else {
    if (isValid(postData,database)) {
      inBase(postData,database);
      logIn(response, postData);
    } else {
      fs.readFile("./index2.html", function(err, data) {
        if (err) {
          return console.log(err);
        }
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write(data);
        response.end();
      });
    }
  }
}

function isRegister(database,postData) {
  for (var i = 0; i < database.length; i++) {
    if (database[i]['name'] == querystring.parse(postData).username || 
      database[i]['id'] == querystring.parse(postData).userid || 
      database[i]['email'] == querystring.parse(postData).useremail || 
      database[i]['phone'] == querystring.parse(postData).userphone) {
      return true;
    }
  }
  return false;
}

function logIn(response,postData) {
  response.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
  response.write("NAME："+querystring.parse(postData).username);
  response.write("\nID："+querystring.parse(postData).userid);
  response.write("\nEMAIL："+querystring.parse(postData).useremail);
  response.write("\nPHONE："+querystring.parse(postData).userphone);
  response.end();
}

function isValid(postData,database) {
  var nameReg=/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
  var idReg = /^[1-9][0-9]{7,7}$/;
  var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var phoneReg = /^[1-9][0-9]{10,10}$/;
  var result = true;
  if (!nameReg.test(querystring.parse(postData).username)) {
    // response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
    // response.write("THE NAME SHOULE BEGIN BY A LETTER AND HAVE 6-18 LETTER.\n");
    result = false;
  }
  if (!idReg.test(querystring.parse(postData).userid)) {
    // response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
    // response.write("THE ID SHOULE HAVE ERIGHT NUMBER AND THE FIRST CAN'T BE ZERO.\n");
    result = false;
  }
  if (!emailReg.test(querystring.parse(postData).useremail)) {
    // response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
    // response.write("THE EMAIL CAN'T BE USED.\n");
    result = false;
  }
  if (!phoneReg.test(querystring.parse(postData).userphone)) {
    // response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
    // response.write("THE PHONE SHOULE HAVE ELEVEN NUMBER AND THE FIRST MUST BE ONE.\n");
    // response.end();
    result = false;
  }
  for (var i = 0; i < database.length; i++) {
    if (database[i]['name'] == querystring.parse(postData).username || 
      database[i]['id'] == querystring.parse(postData).userid || 
      database[i]['email'] == querystring.parse(postData).useremail || 
      database[i]['phone'] == querystring.parse(postData).userphone) {
      result = false;
    }
  }
  return result;
}

function inBase(postData, database) {
  var newData = querystring.parse(postData).username+","
  +querystring.parse(postData).userid+","
  +querystring.parse(postData).useremail+","
  +querystring.parse(postData).userphone+"\r\n";
      database[database.length] = new Array();
      database[database.length-1]['name'] = querystring.parse(postData).username;
      database[database.length-1]['id'] = querystring.parse(postData).userid;
      database[database.length-1]['email'] = querystring.parse(postData).useremail;
      database[database.length-1]['phone'] = querystring.parse(postData).userphone;
      fs.appendFile("database.txt", newData, function(err, data) {});
}
exports.start = start;
exports.upload = upload;