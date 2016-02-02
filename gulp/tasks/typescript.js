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

var fs = require('fs');
var readdir = require('recursive-readdir');


gulp.task('addfiles', (done) => {
  var tsconfig = require(process.cwd() + '/tsconfig.json');
  readdir(process.cwd() + '/src', function (e, files) {
    tsconfig.files = files.filter(function (file) {
      var len = file.length
      return file.substr(len - 3) === '.ts' && file.substr(len - 5) !== ".d.ts";
    }).map(function (file) {
      return file.replace(process.cwd() +'/', '')
    });

    fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig,null,2), function () {
      console.log('%s files added',tsconfig.files.length);
      done();
    });
  })
})

