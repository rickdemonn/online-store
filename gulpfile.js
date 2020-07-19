'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./src/main/scss/*/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./src/main/css/main.css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/main/scss/*/*.scss', gulp.series('sass'));
});