var gulp = require('gulp');

var Server = require('karma').Server;

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');
var del = require('del');

gulp.task('jshint', function() {
  return gulp.src('./js/app/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter(stylish));
});

gulp.task('karma', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js', 
    singleRun: true
  }, done).start();
});

gulp.task('test', ['jshint', 'karma']);

gulp.task('clean', function() {
  del('dist/**/*')
});

gulp.task('buildVendor', function() {
  return gulp.src([
            'bower_components/jquery/dist/jquery.js', 
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'src/js/app.js'
          ]).pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist'));
});

gulp.task('buildCSS', function() {
  return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'src/css/**/*.css'
          ]).pipe(concat('styles.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest('./dist'))
});

gulp.task('moveHTML', function() {
  return gulp.src('src/**/*.html').pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean', 'buildCSS', 'buildVendor', 'moveHTML']);

gulp.task('watch', function() {
  gulp.watch(['./src/js/app/**/*.js', './src/js/tests/**/*.js', './src/css/**/*.css'], ['test', 'build']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});