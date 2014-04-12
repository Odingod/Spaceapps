var express   = require('express'),
    http      = require('http'),
    httpProxy = require('http-proxy'),
    app       = express();
 
var proxy = httpProxy.createProxyServer();
 
function apiProxy(host, port) {
  return function(req, res, next) {
    if(req.url === '/api') {
      proxy.web(req, res, {target:'https://www.taivaanvahti.fi/api'});
    } else {
      next();
    }
  }
}

app.use(apiProxy());
app.use(express.static(__dirname + "/static"));

//static
http.createServer(app).listen(8080);
