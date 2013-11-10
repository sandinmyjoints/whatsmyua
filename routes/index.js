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
  var parsed   = {
      meta: {
          version: res.locals.uaVersion,
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

  res.locals.parsed = parsed;

  return next(req, res);
};

var _render = function(req, res) {

  var context = res.locals.parsed;
  context.title = 'What\'s my user agent?';

  res.locals.timing.end = Date.now();
  console.log("duration: ", res.locals.timing.end - res.locals.timing.start);
  return res.render('index', context);
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
