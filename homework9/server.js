var http = require("http");
var url = require("url");
var fs =require("fs");
var querystring = require("querystring");
var database = new Array();

function start(route, handle) {
  var database = new Array();
  fs.readFile("database.txt", 'utf-8', function (err, data) {
    var line = data.toString().split('\r\n');
    for (var i = 0; i < line.length-1; i++) {
      data = line[i].split(",");
      database[i] = {};
      database[i]['name'] = data[0];
      database[i]['id'] = data[1];
      database[i]['email'] = data[2];
      database[i]['phone'] = data[3];
    }
  });
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    var search = url.parse(request.url).search;//search the username url
    var query = querystring.parse(url.parse(request.url).query).username;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    if (search != null) {
      var isFound = 0;
      for (var i = 0; i < database.length; i++) {
        if (database[i]['name'] == query) {
          isFound = 1;
          response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
          
          response.write("NAME："+database[i]['name']);
          response.write("\nID："+database[i]['id']);
          response.write("\nEMAIL："+database[i]['email']);
          response.write("\nPHONE："+database[i]['phone']);
          response.write("\n welcome back!");
          response.end();
          break;
        }
      }
      if (isFound == 0) {
        response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
        response.write("不存在这样的用户");
        response.end();
      }
    } else {
      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '"+
        postDataChunk + "'.");
      });

      request.addListener("end", function() {
        route(handle, pathname, response, postData, database);
      });
    }

  }

  http.createServer(onRequest).listen(8000);
  console.log("Server has started./localhost:8888/");
}


exports.start = start;
