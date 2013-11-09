
/*
 * GET home page.
 */
var uaParser = require('ua-parser');
var packagejson = require("../package.json");


exports.index = function(req, res) {
  var ua     = uaParser.parse(req.headers['user-agent']);
  var rawUa  = req.headers['user-agent'];
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

  res.render('index', data);
};
