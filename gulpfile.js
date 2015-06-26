var gulp = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    sass    = require('gulp-sass'),
    cssmin  = require('gulp-cssmin'),
    concat  = require('gulp-concat'),
    browserify  = require('browserify'),
    source  = require('vinyl-source-stream');

gulp.task('build', function() {
  browserify('./assets/js/app.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/javascripts'));

  gulp.src('./assets/scss/*.scss')
  .pipe(sass().on('error', gutil.log))
  .pipe(concat('main.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch(['./assets/js/**/*.js', './assets/scss/**/*.scss'], ['build']);
});

gulp.task('default', ['watch']);
