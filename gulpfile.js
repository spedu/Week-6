var gulp = require('gulp');

var Server = require('karma').Server;

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('buildVendor', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js', 
    'bower_components/bootstrap/dist/js/bootstrap.js'
  ]).pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('buildCss', function() {
  gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'src/css/**/*.css'
  ]).pipe(concat('styles.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist'))
});