'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const stripCssComments = require('gulp-strip-css-comments');

gulp.task('images',  () => {
  return gulp.src('src/main/frontend/images/**/*.*')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('src/main/resources/static/build/images'))
});

gulp.task('js', () => {
  return gulp.src('src/main/frontend/js/*.js')
        // .pipe(babel())
        // .pipe(uglify())
        // .pipe(concat('app-main.js', {newLine: ';'}))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/main/resources/static/build/js'))
});

const defaultTask = () => {
  return gulp.parallel('js', 'styles', 'images');
};

gulp.task('styles', () => {
  return gulp.src('src/main/frontend/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(stripCssComments())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/main/resources/static/build/css'))

});

gulp.task('default', defaultTask());

gulp.task('watch', () => {
  return gulp.watch(['src/main/frontend/js/*.js', 'src/main/frontend/scss/*.scss', 'src/main/frontend/images/**/*.*'], {}, defaultTask())
});