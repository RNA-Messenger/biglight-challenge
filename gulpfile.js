const { series, src, dest, watch } = require('gulp');
const minify = require('gulp-minify');
const del = require('del');
const sass = require('gulp-sass');
const gls = require('gulp-live-server');

function jsBuilder() {
    return src("src/*.js")
        .pipe(minify())
        .pipe(dest("public/"));
}

function clean() {
    return del(
        ["public/*.js"]
    )
}

function styleBuilder() {
  return src('./src/styles/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(dest('./public/style/'));
}

function runServer(){
  return gls.new('./app.js').start();
}

exports.serve = runServer; //runs the server
exports.build = series(jsBuilder, styleBuilder); // builds the js and the css files
exports.clean = clean; // clear the public directory from js files if needed
exports.rebuild = series(clean, jsBuilder, styleBuilder); // clear files and calls both builders
exports.default = function() {
    return watch(['src/*.js', 'src/styles/*.scss'], series(jsBuilder, styleBuilder))
} // the actions to perform under default mode


