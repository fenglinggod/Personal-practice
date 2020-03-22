const http = require("http");
const methods = require("methods");
const Url = require("url");
const isAbsolute = require('../../Static-Http/utils/judge').isAbsolute
const fs = require('fs')
const mime = require('mime')
const path = require('path')

// path-to-regexp
const application = () => {
  let app = (req, res) => {
    const method = req.method.toLowerCase();
    const { pathname } = Url.parse(req.url);

    let index = 0;
    function next(err) {
      if (index >= app.routes.length) {
        if(err) {
          return res.send(err)
        }
        return res.end(`Cannot ${method} ${pathname}`);
      }
      const _route = app.routes[index];
      index += 1;
      if(err) {
        if(_route.method === 'middle' && _route.callback.length === 4){
          return _route.callback(err,req,res,next)
        } else {
          next(err)
        }
      } else {
        if (_route.method === "middle") {
            if(_route.path === '/' || _route.path === pathname || pathname.startsWith(`${_route.path}/`)) {
              return _route.callback(req,res,next)
            } 
            next();
        } else {
          if (_route.method === method || _route.method === "all") {
            if (_route.path && _route.path instanceof RegExp) {
              if (_route.path.test(pathname)) {
                const [, ...r] = pathname.match(_route.path);
                let params = _route.path.params.reduce(
                  (m, c, index) => ((m[c] = r[index]), m),
                  {}
                );
                req.params = params;
                _route.callback(req, res);
                return;
              }
            }
            if (pathname === _route.path || _route.path === "*") {
              _route.callback(req, res);
              return;
            };
            next();
          }
        }
      }
    }

    next();
  };
  app.routes = [];
  [...methods, "all"].forEach(method => {
    app[method] = (path, callback) => {
      if (path.includes(":")) {
        let params = [];
        let re = new RegExp(
          path.replace(/:([^\/]+)/g, function() {
            params.push(arguments[1]);
            return "([^/]+)";
          })
        );

        path = re;
        path.params = params;
      }
      const route = {
        method,
        path,
        callback
      };
      app.routes.push(route);
    };
  });
  app.listen = (...args) => {
    http.createServer(app).listen(...args);
  };
  app.use = (path, handler) => {
    if (typeof handler === "undefined") {
      handler = path;
      path = "/";
    }
    let route = {
      method: "middle",
      path,
      callback: handler
    };
    app.routes.push(route);
  };

  app.use(function(req,res,next){
    const method = req.method
    const { pathname, query } = Url.parse(req.url,true);
    req.method = method.toLowerCase()
    req.path = pathname
    req.query = query
    res.sendFile = (path, options={}) => {
      if(!isAbsolute && !options.root) {
        throw new Error('相对路径且没有root')
      }
      
      const p = require('path').join(options.root, path)
      console.log(p)
      res.setHeader('Content-Type', `${mime.getType(p)};charset=utf-8`)
      fs.createReadStream(p).pipe(res)
    }
    res.send = function(value) {
      if(Buffer.isBuffer(value) || typeof value === 'string') {
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        return res.end(value)
      }
      if(typeof value === 'object') {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        return res.end(JSON.stringify(value))
      }
      if(typeof value === 'number') {
        res.statusCode = value
        res.end(require('_http_server'.STATUS_CODES[value]))
      }
    }
    next()
  })

  return app;
};

application.static = (dirname) => {
  return function(req, res, next) {
    const cur = path.join(dirname, req.path)
    fs.stat(cur, (err, statObj) => {
      if(err) {
        return next()
      }
      if(statObj.isFile()) {
        fs.createReadStream(cur).pipe(res)
      } 
    })
  }
}
module.exports = application;

// /dssd/:id/:name
// /:([^\/]+)/g
// let s = '/dssd/:id/:name'
// let c = '/dssd/1/2'
// let a = []
// let regS = s.replace(/:([^\/]+)/g, function(){
//     console.log(arguments)
//     a.push(arguments[1])
//     return '([^\/]+)'
// })
// let reg = new RegExp(regS)
// let [, ...rest] = c.match(reg)
// console.log(rest)
// let p = a.reduce((m,c,i)=>{
//     m[c]=rest[i]
//     return m
// },{})
// console.log(p)
