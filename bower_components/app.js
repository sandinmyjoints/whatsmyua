var UAParser = require('ua-parser-js');
(function () {
  try {
    var parser = new UAParser();
    parser.setUA(WMUArawUa);
    var parsedUa   = parser.getResult();

    var userOs     = parsedUa.os.name + " " + parsedUa.os.version;
    var userAgent  = parsedUa.browser.name + " " + parsedUa.browser.version;
    var userDevice = parsedUa.device.type;

    var elParser = document.getElementById("ua-parser-js");

    var topKeys = Object.keys(parsedUa);
    for(var i = 0; i < topKeys.length; i++) {
      var name = topKeys[i];
      var elH2 = document.createElement("h2");
      elH2.innerHTML = name;
      elParser.appendChild(elH2);
      var elUl  = document.createElement("ul");
      elParser.appendChild(elUl);

      var thisThing = parsedUa[name];
      if(typeof thisThing === "string") {
        var elLi = document.createElement("li");
        elLi.innerHTML = name + ": " + thisThing;
        elUl.appendChild(elLi);
      }
      else {
        var innerKeys = Object.keys(thisThing);
        for(var j = 0; j < innerKeys.length; j++)
        {
          var key = innerKeys[j];
          var val = thisThing[key];

          var elLi = document.createElement("li");
          elLi.innerHTML = key + ": " + val;
          elUl.appendChild(elLi);
        }
      }
    }
  } catch(ex) {
    console.log("caught", ex);
  }
})();
