'use strict';

var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp.task('mocha', function () {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('default', ['mocha']);

gulp.task('test', ['mocha']);
