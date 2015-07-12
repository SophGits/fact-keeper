var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('default', ['watch']);

// gulp.task('minify-scripts', function() {
//   return gulp.src([ "assets/scripts/script.js" ])
//   .pipe(concat('script.min.js'))
//   .pipe(uglify())
//   .pipe(gulp.dest('./assets/scripts'));
// });

gulp.task('minify-less', function() {
  return gulp.src('./assets/styles/style.less')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./assets/styles/'));
});

// gulp.task('fonts', function() {
//   return gulp.src('assets/webfontkit/*')
//   .pipe(gulp.dest('./dist/assets/styles'));
// });

gulp.task('watch', function(){
  gulp.watch('assets/styles/*.less', ['minify-less']);
  // gulp.watch('assets/scripts/*.js', ['minify-scripts']);
  // gulp.watch('assets/webfontkit/*', ['fonts']);
});