(function () {
  try {
    var parser = new UAParser();
    parser.setUA(rawUa);
    var parsedUa   = parser.getResult();

    var userOs     = parsedUa.os.name + " " + parsedUa.os.version;
    var userAgent  = parsedUa.browser.name + " " + parsedUa.browser.version;
    var userDevice = parsedUa.device.type;
    console.log("got", userOs, userAgent, userDevice);

    var elParser = document.getElementById("ua-parser-js");
    var elUl  = elParser.getElementsByTagName("ul");
    var mapping = {
        ua:  elUl[0],
        os:  elUl[1],
        browser: null,
        engine: null,
        cpu: null,
        device: elUl[2]
    };

    var keys = Object.keys(mapping);
    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var el = mapping[key];
        var val = parsedUa[key];
        var elLi = document.createElement("li");
        console.log("adding " + key + ": " + val);
        if(typeof val === "string") {
            elLi.innerText = "raw" + key + ": " + val;
        }
        else {
            elLi.innerText = key + ": " + val;
        }

        if(el) el.appendChild(elLi);
    }

  } catch(ex) {
    console.log("caught", ex);
  }
})();
