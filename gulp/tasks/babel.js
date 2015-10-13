'use strict';

const gulp = require('gulp'),
	babel = require('gulp-babel'),

	Path = require('path');
	

gulp.task('babel', ['typescript'], function () {
	
	let result = gulp.src(Path.join(process.cwd(),'lib','**','*.js'))
	.pipe(babel({
		optional: ['es7.decorators']
	})).pipe(gulp.dest('lib'))

});