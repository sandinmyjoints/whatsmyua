# What's my user agent (ua)?

## What does your ua lib *really* think?

* [ua-parser](https://github.com/tobie/ua-parser)
* [ua-parser-js](https://github.com/faisalman/ua-parser-js)
* [platform.js](https://github.com/bestiejs/platform.js/)

Running live at **[whatsmyua.info](http://www.whatsmyua.info)**.

## API

`GET /api/v1/ua?ua=<ua-string>`

Parameters (optional):

* `ua-string`: Be sure to url-encode it. Defaults to your request's user agent string.
