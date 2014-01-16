/*
 * GET home page.
 */
var uaParser = require('ua-parser');
var packagejson = require("../package.json");


// Helpers.
var _parseUa = function(req, res, next) {
  // Add version.
  res.locals.uaVersion = packagejson.dependencies["ua-parser"];

  // Locals.
  var version = res.locals.uaVersion;

  var rawUa  = res.locals.ua;
  var ua     = uaParser.parse(rawUa);

  // Add ua-parser.
  res.locals.parsed   = {
      meta: {
          name: "ua-parser",
          repo: "https://github.com/tobie/ua-parser",
          version: res.locals.uaVersion
      },
      ua: {
          rawUa: rawUa,
          string: ua.ua,  // TODO
          family: ua.family,
          major: ua.major,
          minor: ua.minor,
          patch: ua.patch,
          device: ua.device
      },
      os: {
          string: ua.os,  // TODO
          family: ua.os.family,
          major: ua.os.major,
          minor: ua.os.minor,
          patch: ua.os.patch
      }
  };

  // Add ua-parser-js.
  res.locals.uaParserJsMeta = {
    meta: {
      name: "ua-parser-js",
      repo: "https://github.com/faisalman/ua-parser-js",
      version: ""
    }
  };

  return next(req, res);
};

var _render = function(req, res) {
  res.locals.title = 'What\'s my user agent?';
  res.locals.timing.end = Date.now();
  console.log("duration: ", res.locals.timing.end - res.locals.timing.start);
  return res.render('index');
};

var _api = function(req, res) {
  res.locals.timing.end = Date.now();
  console.log("duration: ", res.locals.timing.end - res.locals.timing.start);
  return res.jsonp(res.locals.parsed);
};

// Methods.
var post = function(req, res) {
    res.locals.ua = req.body["custom-ua-string"] || req.headers['user-agent'];
    return _parseUa(req, res, _render);
};

var get = function(req, res) {
    res.locals.ua = req.headers['user-agent'];
    return _parseUa(res, res, _render);
};

var apiGet = function(req, res) {
    res.locals.ua = req.param("ua") || req.headers['user-agent'];
    return _parseUa(req, res, _api);
};

module.exports = {
  site: {
    get: get,
    post: post
  },
  api: {
    get: apiGet
  }
};
