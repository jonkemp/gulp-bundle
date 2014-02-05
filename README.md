# [gulp](https://github.com/wearefractal/gulp)-bundle [![Build Status](https://travis-ci.org/jonkemp/gulp-bundle.png?branch=master)](https://travis-ci.org/jonkemp/gulp-bundle)

> Parse build blocks in HTML to concatenate JavaScript and CSS files. An option to minify files is available.


## Install

Install with [npm](https://npmjs.org/package/gulp-bundle)

```
npm install --save-dev gulp-bundle
```


## Usage

```js
var gulp = require('gulp'),
    bundle = require('gulp-bundle');

gulp.task('bundle', bundle());
```

With options:

```js
var gulp = require('gulp'),
    bundle = require('gulp-bundle');

gulp.task('bundle', bundle({
    appDir: 'app/',
    buildDir: 'dist/',
    minify: true
}));
```


The build block syntax is `build:type path/filename`. Valid types are `js` and `css`.

    <html>
    <head>
        <!-- build:css css/combined.css -->
        <link href="css/one.css" rel="stylesheet">
        <link href="css/two.css" rel="stylesheet">
        <!-- endbuild -->
    </head>
    <body>
        <!-- build:js scripts/combined.js -->
        <script type="text/javascript" src="scripts/one.js"></script>
        <script type="text/javascript" src="scripts/two.js"></script>
        <!-- endbuild -->
    </body>
    </html>


## API

### bundle(options)


#### options.appDir

Type: `String`  
Default: `app/`

Where to find the files.


#### options.buildDir

Type: `String`  
Default: `dist/`

Where to put the files.


#### options.minify

Type: `Boolean`  
Default: `true`

Minifies CSS and JavaScript files.


## License

MIT © [Jonathan Kemp](http://jonkemp.com)
