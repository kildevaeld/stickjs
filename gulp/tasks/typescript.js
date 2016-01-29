'use strict';

const gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	merge = require('merge2'),
	Path = require('path'),
    babel = require('gulp-babel');
	
const project = typescript.createProject('tsconfig.json', {
	declaration: true
});

gulp.task('typescript', function () {
	
	let result = project.src(Path.join(process.cwd(),'src','**','*.ts'))
	.pipe(typescript(project));
	
    let js = result.js.
    pipe(babel({
        compact: false,
        "plugins": ["transform-decorators"],
        presets: ["es2015", 'stage-0'],    
    }))
    
	return merge([
		js.pipe(gulp.dest('lib')),
		result.dts.pipe(gulp.dest('lib'))		
	]);

});