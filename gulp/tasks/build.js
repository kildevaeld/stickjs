

const gulp = require('gulp');

gulp.task('build', ['typescript','webpack', 'webpack:bundle'])