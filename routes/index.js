/*
 * GET home page.
 */
var uaParser = require('ua-parser');
var platformjs = require("platform");
var packagejson = require("../package.json");


// Helpers.
var _parseUa = function(req, res, next) {
  // Add version.
  var uaParserVersion = packagejson.dependencies["ua-parser"];
  var platformVersion = packagejson.dependencies["platform"];
  var uaParserJsVersion = packagejson.dependencies["ua-parser-js"];

  // Locals.
  var rawUa  = res.locals.ua;
  var parsedData = [];

  // Add ua-parser.
  var ua     = uaParser.parse(rawUa);
  parsedData.push({
      meta: {
          name: "ua-parser",
          repo: "https://github.com/tobie/ua-parser",
          version: uaParserVersion
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
  });

  // Add ua-parser-js.
  parsedData.push({
    meta: {
      name: "ua-parser-js",
      repo: "https://github.com/faisalman/ua-parser-js",
      version: uaParserJsVersion
    }
  });

  // Add platform.js.
  var platform = platformjs.parse(rawUa);
  parsedData.push({
    meta: {
      name: "platform.js",
      repo: "https://github.com/bestiejs/platform.js/",
      version: platformVersion
    },
    ua: {
      name: platform.name,
      version: platform.version,
      layout: platform.layout
    },
    os: {
      os: platform.os
    },
    device: {
      product: platform.product,
      manufacturer: platform.manufacturer,
      description: platform.description
    }
  });

  res.locals.parsedData = parsedData;

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
  return res.jsonp(res.locals.parsedData);
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
