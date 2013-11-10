# What's my user agent (ua)?

What does [ua-parser](https://github.com/tobie/ua-parser) say my user agent is?

Running live at **[whatsmyua.info](http://www.whatsmyua.info).**

## API

`GET /api/v1?ua=<ua-string>&version=<ua-parser-version>`

Parameters:

* `ua-string`: Be sure to url-encode it. Defaults to your request's user agent string.
* `ua-parser-version`: Coming soon. Defaults to "latest".
