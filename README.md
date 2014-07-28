# Make It Happen generator

![](http://i.imgur.com/XJklAT1.png)

An opinionated [Yeoman](http://yeoman.io) generator that scaffolds a Browserify-based, Grunt-built web app.

Maintainer: [Dan Delany](http://github.com/dandelany) & the [Enigma.io](http://enigma.io) dev team

## Features

### Always installed:
* [JQuery](http://api.jquery.com)
* [Underscore](http://underscorejs.org/)
* [LESS](http://lesscss.org/)
* [LESS Hat mixin library](http://lesshat.madebysource.com/)
* [Normalize.css](http://necolas.github.io/normalize.css/)
* [Grunt](http://gruntjs.com/)
* [Browserify](http://browserify.org/)
* [Grunt file watcher](https://github.com/gruntjs/grunt-contrib-watch)
* [Grunt HTML builder](https://github.com/spatools/grunt-html-build)
* [LESS compiler](https://github.com/gruntjs/grunt-contrib-less)
* [Connect server](https://github.com/gruntjs/grunt-contrib-connect)
* [UglifyJS](https://github.com/mishoo/UglifyJS)
* [CSSMin](https://code.google.com/p/cssmin/)

### Optional:
* [D3.js](http://d3js.org)
* [Bacon.js](http://baconjs.github.io/)
* [Google Web Fonts](https://www.google.com/fonts)
* [Material Design Color Palette](http://www.google.com/design/spec/style/color.html#color-ui-color-palette)
* [Ionicons](http://ionicons.com/)

## Usage

```
npm install -g generator-make-it-happen
```

Then run the debug server:

```
grunt debug
```

The development build will be created in `build/dev`. NOTE: files in the `build` directory should never be modified, 
as they will be overwritten whenever the grunt task is run. Make all modifications in `src`.

To build a minified version of the app for distribution, run the 'build' grunt task:

```
grunt build
```

The build will be created in `build/dist`.

## Roadmap

Planned features in rough order of priority:

* Unit tests for generator
* Unit testing framework(s) for app
* Image (PNG/GIF/JPG/SVG) minification
* Sprite generation
* JSHint Javascript linter
* Choice of Underscore or Lodash
* Bacon.model?
* Backbone option?
* Jekyll?

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md).

Bugs and feature requests may be reported on the
[Github issues page](https://github.com/dandelany/generator-make-it-happen/issues).

Pull requests are welcome. However, this is an opinionated generator, and your opinions on what should be included
may differ from ours. For this reason, filing an issue to discuss your planned contribution before writing any 
code is encouraged.

## License

Copyright © 2014 <dan.delany@gmail.com>

This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING.md file for more details.
