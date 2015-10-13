

const gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('uglify', ['bundle'], function () {
	gulp.src('./build/stick.js')
	.pipe(uglify())
	.pipe(rename('stick.min.js'))
	.pipe(gulp.dest('./build'))
})