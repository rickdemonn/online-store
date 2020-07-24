'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
 
gulp.task('sass', function () {
  return gulp.src('./src/main/scss/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(stripCssComments())
  .pipe(gulp.dest('./src/main/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/main/scss/theme/*.scss', gulp.series('sass'));
  gulp.watch('./src/main/scss/style.scss', gulp.series('sass'));
});