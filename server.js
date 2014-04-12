var express   = require('express'),
    http      = require('http'),
    httpProxy = require('http-proxy'),
    app       = express();
 
var proxy = httpProxy.createProxyServer();

//Proxy
app.use(function(req, res, next) {
  if(req.url === '/api') {
    proxy.web(req, res, {
      target:'https://www.taivaanvahti.fi/api',
      secure: true
    });
  } else {
    next();
  }
});

//Static stuff
app.use(express.static(__dirname + "/static"));

http.createServer(app).listen(8080);
