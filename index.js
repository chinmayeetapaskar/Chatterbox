var http = require('http');
var fs = require('fs');
//var path = require('path');
var extract = require('./extract');
var mime = require("mime");
var wss = require('./websockets-server');

var handleError = function(err, res) {
  //res.writeHead(404,{ 'Content-Type': 'text/html'});
  res.writeHead(404);
  fs.readFile("app/error.html", function(err, data) {
    res.end(data);
  });

};
var server = http.createServer(function(req, res) {
  console.log('responding to request');
  //var url = req.url;
  //var fileName = 'index.html';
  //if(url.length > 1){
  //fileName = url.substring(1);
  //}
  //console.log(fileName);
  //res.end('<h1>Hello, World !!</h1>')
  //var filePath = path.resolve(_dirname, 'app', fileName);
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);
