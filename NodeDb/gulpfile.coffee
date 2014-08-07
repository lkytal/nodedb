gulp = require 'gulp'
coffee = require 'gulp-coffee'
watch = require 'gulp-watch'

gulp.task 'coffee', -> gulp
	.src './application.coffee'
	.pipe (coffee bare: true)
	.on 'error', console.log
	.pipe (gulp.dest './/')

gulp.task 'watch', -> gulp
	.src '.application.coffee'
	.pipe watch (files) ->
		files.pipe(coffee bare: true)
		.pipe (gulp.dest './')

gulp.task 'default', ->
	gulp.run 'coffee'
	gulp.run 'watch'
