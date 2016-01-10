var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefix = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');


gulp.task('sass', function(){
  gulp.src('./src/scss/**/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe(autoprefix())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe( gulp.dest('./dist/css/'));
});

gulp.task('compress',function(){
  gulp.src(['src/js/model.js',
      'src/js/filters.js',
      'src/js/controller.js',
      'src/js/views.js',
      'src/js/app.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.js').on('error', function(e){
        console.log(e);
       }))
      .pipe(uglify().on('error', function(e){
        console.log(e);
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['compress']);
});

gulp.task('default',['watch']);