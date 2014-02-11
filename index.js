var Glob = require('glob').Glob,
    fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    useref = require('useref'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

module.exports = function(globs, opt){
    opt = _.extend({
        appDir: 'app',
        buildDir: 'dist',
        minify: true,
        minifyCss: {},
        minifyJs: {}
    }, opt);

    if (!globs) {
        globs = opt.appDir + '/*.html';
    }

    return function () {
        return new Glob(globs, opt, function (err, files) {
            _.forEach(files, function (p) {
                var assets = useref(fs.readFileSync(path.normalize(p), { encoding: 'utf-8'}))[1];
                var css = assets.css;
                var js = assets.js;

                function prefixPath(paths) {
                    _.forEach(paths, function (val, i) {
                        paths[i] = path.join(opt.appDir, val);
                    });
                    return paths;
                }

                _.forEach(css, function (paths, name) {
                    if (name !== '' && paths.length) {
                        prefixPath(paths);

                        return gulp.src(paths)
                            .pipe(concat(path.basename(name)))
                            .pipe(gulpif(opt.minify, minifyCss(opt.minifyCss)))
                            .pipe(gulp.dest(path.join(opt.buildDir, path.dirname(name))));
                    }
                });

                _.forEach(js, function (paths, name) {
                    if (name !== '' && paths.length) {
                        prefixPath(paths);

                        return gulp.src(paths)
                            .pipe(concat(path.basename(name)))
                            .pipe(gulpif(opt.minify, uglify(opt.minifyJs)))
                            .pipe(gulp.dest(path.join(opt.buildDir, path.dirname(name))));
                    }
                });
            });
        });
    };
};
