var gulp 				= require('gulp');
	scss 				= require('gulp-sass'),
	autoprefixer 		= require('gulp-autoprefixer'),
 	NwBuilder 			= require('node-webkit-builder'),
	path				= {
		'public': 'app/public'
	},
	autoPrefixerBrowers = [
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.0',
		'bb >= 10',
		'ie >= 10',
		'ie_mob >= 10',
		'ff >= 30'
	];

/*
 * Compile SCSS
 */
gulp.task('style', function() {
	gulp.src(path.public+'/scss/style.scss')
		.pipe(scss())
		.pipe(autoprefixer(autoPrefixerBrowers))
		.pipe(gulp.dest(path.public+'/css'));
});

/*
 * Watch Files
 */
gulp.task('watch', ['style'], function() {
	gulp.watch(path.public+'/scss/**/*.scss', ['style']);
});

gulp.task('build', function() {
	var nw = new NwBuilder({
		files: '**/*', // use the glob format
		platforms: ['osx64']
	});

	nw.build(function(err) {
		if(err) console.log(err);
	});
});

/*
 * Default Task
 */
gulp.task('default', ['style', 'watch']);