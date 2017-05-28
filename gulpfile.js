var dest = 'dist';

// GULP + HELPERS
var gulp = require('gulp');
var rename = require('gulp-rename');
var install = require("gulp-install");

// CSS
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');

// JS
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// VENDOR JS
var mainBowerFiles = require('main-bower-files');

// DEBUG
var browserSync = require('browser-sync').create();


gulp.task('vendor-css', function () {
    return gulp.src(['app/vendor/css/**/*.css'])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))

        .pipe(rename('vendor.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('scss', function () {
    return gulp.src(['app/scss/**/*.scss'])
        .pipe(concat('app.css'))
        .pipe(sass())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))

        .pipe(rename('app.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))

        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('map'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('vendor-js', function () {
    var files = mainBowerFiles().concat('app/vendor/js/**/*.js');

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))

        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('map'))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: dest
        },
    })
});

gulp.task('install', function () {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

gulp.task('serve', ['install', 'browserSync', 'html', 'vendor-css', 'scss', 'js', 'vendor-js'], function () {
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/js/**/*.js', ['js']);
    gulp.watch('app/vendor/js/**/*.js', ['vendor-js']);
    gulp.watch('app/vendor/css/**/*.js', ['vendor-css']);
});

gulp.task('default', ['serve']);