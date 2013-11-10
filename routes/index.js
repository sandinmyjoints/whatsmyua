/*
 * GET home page.
 */
var uaParser = require('ua-parser');
var packagejson = require("../package.json");

var post = function(req, res) {
    res.locals.ua = req.body["custom-ua-string"] || req.headers['user-agent'];
    return _route(req, res);
};

var get = function(req, res) {
    res.locals.ua = req.headers['user-agent'];
    return _route(req, res);
};

var _route = function(req, res) {
  var ua     = uaParser.parse(res.locals.ua);
  var rawUa  = res.locals.ua;
  var data   = {
      title: 'What\'s my user agent?',
      meta: {
          version: packagejson.dependencies["ua-parser"],
          env: res.locals.env
      },
      ua: {
          rawUa: rawUa,
          string: ua.ua.toString(),
          family: ua.family,
          major: ua.major,
          minor: ua.minor,
          patch: ua.patch,
          device: ua.device,
          isMobile: /mobile/i.test(rawUa)
      },
      os: {
          string: ua.os.toString(),
          family: ua.os.family,
          major: ua.os.major,
          minor: ua.os.minor,
          patch: ua.os.patch
      }
  };

  res.locals.timing.end = Date.now();
  console.log("duration: ", res.locals.timing.end - res.locals.timing.start);
  res.render('index', data);
};

module.exports = {
    get: get,
    post: post
};

