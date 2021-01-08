const gulp = require('gulp');
const plumber = require('gulp-plumber');
const cssimport = require('gulp-cssimport');
const size = require('gulp-size');
const del = require('del');

const targetDir = 'assets';

function buildCss(cb) {
  // workaround on themekit not updating application.scss.liquid file
  del.sync('./assets/**/[^_]*.scss.liquid');
  setTimeout(function() {
    gulp.src('css/**/[^_]*.*', {base: './css/'})
      .pipe(plumber())
      .pipe(cssimport())
      .pipe(size({
        showFiles: true,
        pretty: true,
      }))
      .pipe(gulp.dest(targetDir));
  }, 1000)
  cb();
}

function watchCss(cb) {
  gulp.watch(['css/**/*.scss.liquid'], buildCss)
  cb();
}

function watchTheme(cb) {
  let exec = require('child_process').exec;
  let themeProcess = exec('theme watch');

  themeProcess.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
  cb();
}

function watchWebpack(cb) {
  let exec = require('child_process').exec;
  let themeProcess = exec('webpack --watch');

  themeProcess.stdout.on('data', function(data) {
    process.stdout.write(data);
  });
  cb();
}

exports.watch = watchTheme;
exports.buildJs = watchWebpack;
exports.buildCss = buildCss;
exports.default = gulp.parallel(watchCss, watchWebpack, watchTheme);

