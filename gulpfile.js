/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    "use strict";
    var gulp = require('gulp');
 
    var concat = require('gulp-concat');
    var rename = require("gulp-rename");
    var uglify = require('gulp-uglify');
    var jshint = require('gulp-jshint');
    var jslint = require('gulp-jslint-simple');
    var browserify = require('gulp-browserify');

    var webjs = [
        './src/web/xmldocformatter.js'
    ];
    
    var nodejs = [
        './src/nodejs/xmldocformatter.js'
    ];
    
    gulp.task('js-cs', function () {
        gulp.src('./src/**/*.js')
                .pipe(jshint())
                .pipe(jslint.run({}));
    });
    
    gulp.task('web-js', function () {
        gulp.src(webjs)
                .pipe(concat('xmldocformatter.js'))
                .pipe(gulp.dest('./build/web/'))
                .pipe(uglify())
                .pipe(rename({suffix: ".min"}))
                .pipe(gulp.dest('./build/web/'));
    });
    
    gulp.task('node-js', function () {
        gulp.src(nodejs)
                .pipe(browserify())
                .pipe(gulp.dest('./build/nodejs/'))
                .pipe(uglify())
                .pipe(rename({suffix: ".min"}))
                .pipe(gulp.dest('./build/nodejs/'));
    });

    gulp.task('watch', ['web-js', 'node-js'], function () {
        gulp.watch('./src/**/*.js', ['web-js', 'node-js']);
    });

    gulp.task('release', ['web-js', 'node-js']);

    gulp.task('default', ['release']);

}());