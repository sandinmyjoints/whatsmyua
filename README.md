# What's my user agent (ua)?

## What does your ua lib *really* think?

* [ua-parser](https://github.com/tobie/ua-parser)
* [ua-parser-js]("https://github.com/faisalman/ua-parser-js")

Running live at **[whatsmyua.info](http://www.whatsmyua.info)**.

## API

`GET /api/v1?ua=<ua-string>&version=<ua-parser-version>`

Parameters:

* `ua-string`: Be sure to url-encode it. Defaults to your request's user agent string.
* `ua-parser-version`: Coming soon. Defaults to "latest".
