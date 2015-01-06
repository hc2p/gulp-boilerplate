var gulp = require('gulp');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

gulp.task('normalize', function(){
    gulp.src(['bower_components/normalize-css/normalize.css'])
        .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() {
    gulp.src(['src/coffee/**/*.coffee'])
        .pipe(sourcemaps.init())
        .pipe(coffee({bare: true}).on('error', function(err){
            gutil.log(gutil.colors.red(err))
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('styles', ['normalize'], function() {
    gulp.src(['src/sass/**/*.scss'])
        .pipe(sass().on('error', function(err){
            gutil.log(gutil.colors.red('Error in SASS syntax'));
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('content', function(){
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});


gulp.task('default', ['scripts', 'styles', 'content'], function() {

  gulp.watch('src/coffee/**', function(event) {
    gulp.run('scripts');
  });
  gulp.watch('src/sass/**', function(event) {
    gulp.run('styles');
  });
  gulp.watch('src/index.html', function(event) {
    gulp.run('content');
  });

});
