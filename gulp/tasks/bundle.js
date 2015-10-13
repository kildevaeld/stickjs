'use strict';

const gulp = require('gulp'),
	webpack = require('gulp-webpack');


gulp.task('bundle', ['typescript'], () => {

	return gulp.src('./lib/index.js')
		.pipe(webpack({
			module: {
				loaders: [
					{
						test: /\.js?$/,
						exclude: /(node_modules|bower_components)/,
						loader: 'babel',
						query: {
        			optional: ['es7.decorators'],
        			stage: 0
      			}
					}
				]
			},
			output: {
				filename: 'stick.js',
				library: 'stick',
				libraryTarget: 'umd'
			}
		}))
		.pipe(gulp.dest('build'))

});