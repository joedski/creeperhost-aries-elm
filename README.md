Elm Wrapper for CreeperHost Aries API
=====================================

[Elm][] is a Functional Reactive Programming language for building reactive UIs.  [CreeperHost's Aries API][aries] is a service provided by [CreeperHost][] to use outside apps to monitor and potentially work with Minecraft servers hosted by them.

Since CreeperHost doesn't add CORS headers to their API responses, it generally cannot be used in a web browser.  Since Elm is a UI language, it generally canont be used in a server.  So, this library is basically only for [nw.js][nwjs] projects.

[Elm]: http://elm-lang.org/
[aries]: https://github.com/lesander/creeperhost-api
[nwjs]: https://github.com/nwjs
[creeperhost]: http://www.creeperhost.net/
