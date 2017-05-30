var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  autoprefix = require('gulp-autoprefixer'),
  gutil = require('gulp-util'),
  imagemin = require('gulp-imagemin'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  sourcemaps = require('gulp-sourcemaps');

var config = {
  sourceMaps: !process.env.production
}

var paths = {
  js: './src/js/**/*.js',
  css: './src/scss/**/*.scss'
};

gulp.task('js', () => {
  return browserify('./src/js/app.js')
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .on('error', (e) => {
     gutil.log(e);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
      .pipe(uglify())
    // .pipe(gulpif(config.sourceMaps, sourcemaps.write()))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', () => {
  gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefix())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});


gulp.task('serve', ['css'],() => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.css, ['css']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch(paths.js).on('change', browserSync.reload);
});

gulp.task('watch', ['js', 'css', 'move', 'images'], () => {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch('./src/img/**/*.*', ['images']);
  gulp.watch('./src/**/*.html', ['move'])
});

gulp.task('move', () => {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('images', () => {
  gulp.src('./src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('build', ['js'], () => {
  console.log('building...')
})

gulp.task('default', ['js','css','move', 'watch', 'serve']);
