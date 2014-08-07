var coffee, gulp, watch;

gulp = require('gulp');

coffee = require('gulp-coffee');

watch = require('gulp-watch');

gulp.task('coffee', function() {
  return gulp;
}).src('./application.coffee').pipe(coffee({
  bare: true
})).on('error', console.log).pipe(gulp.dest('.//'));

gulp.task('watch', function() {
  return gulp;
}).src('.application.coffee').pipe(watch(function(files) {
  return files.pipe(coffee({
    bare: true
  })).pipe(gulp.dest('./'));
}));

gulp.task('default', function() {
  gulp.run('coffee');
  return gulp.run('watch');
});
