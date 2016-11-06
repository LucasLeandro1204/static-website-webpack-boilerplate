var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    package = require('./package.json'),
    filter = require('gulp-filter'),
    plumber = require('gulp-plumber'),
    pug = require('gulp-pug');

var banner = [
  '/*!\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

var paths = {
  src: './src',
  build: './public/build',
  public: './public',
};

gulp.task('clean', function () {
  //-----------------
});

gulp.task('sass', function () {
  return gulp.src(paths.src + '/sass/style.sass')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package: package }))
    .pipe(gulp.dest(paths.build + '/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts',function(){
  gulp.src(paths.src + '/scripts/scripts.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(header(banner, { package: package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.build + '/scripts'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('views', function() {
  gulp.src(paths.src + '/views/**/*.pug')
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug())
    .pipe(gulp.dest(paths.public));
});

gulp.task('images', function () {
  gulp.src([paths.src + '/images/**/*'])
    .pipe(gulp.dest(paths.build + '/images'));
});

gulp.task('browser-sync', function () {
  browserSync.init(null, {
    server: {
      baseDir: paths.public,
    },
    files: [paths.public + '/**/*']
  });
});

gulp.task('default', ['clean', 'sass', 'images', 'scripts', 'views']);

gulp.task('watch', ['clean', 'sass', 'images', 'scripts', 'views', 'browser-sync'], function () {
  gulp.watch(paths.src + '/sass/**/*.sass', ['sass']);
  gulp.watch(paths.src + '/scripts/*.js', ['scripts']);
  gulp.watch(paths.src + '/views/**/*.pug', ['views']);
  gulp.watch(paths.src + '/views/**/*.md', ['views']);
  gulp.watch(paths.src + '/images/**/*', ['images']);
});
