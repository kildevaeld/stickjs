'use strict';

const gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	merge = require('merge2'),
	Path = require('path');
	
const project = typescript.createProject('tsconfig.json', {
	declaration: true
});

gulp.task('typescript', function () {
	
	let result = project.src(Path.join(process.cwd(),'src','**','*.ts'))
	.pipe(typescript(project));
	
	return merge([
		result.js.pipe(gulp.dest('lib')),
		result.dts.pipe(gulp.dest('lib'))		
	]);

});