# Make It Happen generator

Maintainer: [Dan Delany](http://github.com/dandelany)

An opinionated [Yeoman](http://yeoman.io) generator that scaffolds a Browserify-based, Grunt-built web app.

## Features

### Always installed:
* JQuery

### Optional:
* D3.js

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
* JSHint Javascript linter
* Image (PNG/GIF/JPG/SVG) minification
* Sprite generation

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md).

Bugs and feature requests may be reported on the
[Github issues page](https://github.com/dandelany/generator-make-it-happen/issues).

Pull requests are welcome. However, this is an opinionated generator, and your opinions on how it should work
may differ from mine. For this reason, filing an issue to discuss your planned contribution before writing any 
code is encouraged.

## License

Copyright © 2014 <dan.delany@gmail.com>
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See the COPYING.md file for more details.
