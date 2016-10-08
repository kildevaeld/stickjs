'use strict';

const gulp = require('gulp'),
	webpack = require('gulp-webpack');


gulp.task('webpack', ['typescript'], () => {

	return gulp.src('./lib/index.js')
		.pipe(webpack({
			
			output: {
				filename: 'stick.js',
				library: 'stick',
				libraryTarget: 'umd'
			},
			resolve: {
				alias: {
					'orange.request': process.cwd() + '/node_modules/orange.request/lib/browser.js'
				}
			},
			externals: {
				"eventjs": "eventsjs",
				"orange": 'orange',
				"orange.request": {
					commonjs: 'orange.request',
					commonjs2: 'orange.request',
					amd: 'orange.request',
					root: ['orange', 'request']
				},
				'orange.dom': {
					commonjs: 'orange.dom',
					commonjs2: 'orange.dom',
					amd: 'orange.dom',
					root: ['orange', 'dom']
				},
				'collection': 'collection',
				'templ': 'templ'
				
			}
		}))
		.pipe(gulp.dest('build'))

});

gulp.task('webpack:bundle', ['typescript'], () => {

	return gulp.src('./lib/index.js')
		.pipe(webpack({
			
			output: {
				filename: 'stick.bundle.js',
				library: 'stick',
				libraryTarget: 'umd'
			},
			resolve: {
				alias: {
					'orange.request': process.cwd() + '/node_modules/orange.request/lib/browser.js'
				}
			}
		}))
		.pipe(gulp.dest('build'))

});