var http = require('http');
var url = require('url');

console.log('node.js application starting...');

var svr = http.createServer(function(req, resp) {
  
  	var search = url.parse(req.url).search; 
    var pathname = url.parse(req.url).pathname;

  if (req.method == 'GET' && pathname == '/gets') {
    resp.write('This is valid GET request' + "\n")
    if (search == null) {
      resp.write('You have not specified any query parameters' + "\n")
    }
    else {
        resp.write(search + "\n")
    }
  }
  else if (req.method == 'POST' && pathname == '/posts') {
    resp.write('This is valid POST request' + "\n")
    if (search == null) {
      resp.write('You have not specified any query parameters' + "\n")
    }
    else {
        resp.write(search + "\n")
    }    
  }
  else if (req.method == 'PUT' && pathname == '/puts') {
    resp.write('This is valid PUT request' + "\n")
    if (search == null) {
      resp.write('You have not specified any query parameters' + "\n")
    }
    else {
        resp.write(search + "\n")
    }    
  }
  else if (req.method == 'DELETE' && pathname == '/deletes') {
    resp.write('This is valid DELETE request' + "\n")
    if (search == null) {
      resp.write('You have not specified any query parameters' + "\n")
    }
    else {
        resp.write(search + "\n")
    }
  }
  else {
    resp.write('This server does not support the http method.')
  }
  
  	resp.end();
});

svr.listen(9000, function() {
    console.log('Node HTTP server is listening');
});