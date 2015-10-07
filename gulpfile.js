var gulp = require('gulp');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('jshint', function(){
  return gulp.src(['./src/js/**/*.js', './src/tests/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test', ['jshint', 'karma']);

// *************************************************

gulp.task('buildApp', function(){
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', function(){
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './src/css/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

gulp.task('buildVendor', function(){
  gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('moveHTML', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['buildApp', 'buildCSS', 'buildVendor', 'moveHTML']);

// *************************************************

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// **************************************************

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js', ['buildApp']);
  gulp.watch('src/css/**/*.css', ['buildCSS']);
  gulp.watch('src/**/*.html', ['moveHTML']);
});

// **************************************************

gulp.task('default', ['test', 'build', 'connect', 'watch']);
