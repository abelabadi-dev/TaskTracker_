'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('./assets/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
  return gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function () {
  gulp.watch('./assets/**/*.scss', ['sass']);
  gulp.watch('./assets/**/*.js', ['scripts']);
});