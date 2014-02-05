var glob = require('glob'),
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    useref = require('useref'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

module.exports = function(opt){
    opt = _.extend({
        appDir: 'app/',
        buildDir: 'dist/',
        minify: true
    }, opt);

    return function () {
        glob(opt.appDir + '*.html', function (err, files) {
            _.forEach(files, function (p) {
                var assets = useref(fs.readFileSync(path.normalize(p), { encoding: 'utf-8'}))[1];
                var css = assets.css;
                var js = assets.js;

                function prefixPath(paths) {
                    _.forEach(paths, function (val, i) {
                        paths[i] = opt.appDir + val;
                    });
                    return paths;
                }

                _.forEach(css, function (paths, name) {
                    prefixPath(paths);

                    return gulp.src(paths)
                        .pipe(concat(path.basename(name)))
                        .pipe(gulpif(opt.minify, minifycss()))
                        .pipe(gulp.dest(opt.buildDir + path.dirname(name)));
                });

                _.forEach(js, function (paths, name) {
                    prefixPath(paths);

                    return gulp.src(paths)
                        .pipe(concat(path.basename(name)))
                        .pipe(gulpif(opt.minify, uglify()))
                        .pipe(gulp.dest(opt.buildDir + path.dirname(name)));
                });
            });
        });
    };
};