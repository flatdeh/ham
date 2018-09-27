'use strict';

let gulp = require('gulp'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    gulpSequence = require('gulp-sequence');

gulp.task('concat-and-minify-js', function () {
    gulp.src(['./src/js/**/!(script)*.js', './src/js/script.js'])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({suffix: ".min",}))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('image-min', () =>
    gulp.src('./src/img/**/*.**')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/img'))
);

gulp.task('sass-concat-minify-css', function () {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: ".min",}))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task('copy-html', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('dev', ['build'], function () {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('./src/scss/**/*.scss', ['sass-concat-minify-css']).on('change', browserSync.reload);
    gulp.watch("./src/*.html", ['copy-html']).on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", ['concat-and-minify-js']).on('change', browserSync.reload);
});

gulp.task('build', gulpSequence('clean', ['sass-concat-minify-css', 'copy-html', 'concat-and-minify-js', 'image-min']));
