var gulp 				= require('gulp');
	scss 				= require('gulp-sass'),
	autoprefixer 		= require('gulp-autoprefixer'),
	minifyCSS 			= require('gulp-minify-css'),
	rename				= require('gulp-rename'),
	NwBuilder 			= require('node-webkit-builder'),
	util				= require('gulp-util'),
	rimraf		 		= require('gulp-rimraf'),
	useref				= require('gulp-useref'),
	uglify				= require('gulp-uglify'),
	gulpif				= require('gulp-if'),
	ngAnnotate			= require('gulp-ng-annotate'),
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

/**
 * Compile SCSS
 */
gulp.task('style', function() {
	gulp.src(path.public+'/scss/style.scss')
		.pipe(scss())
		.pipe(autoprefixer(autoPrefixerBrowers))
		.pipe(gulp.dest(path.public+'/css'))
		.pipe(minifyCSS())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest(path.public+'/css'));
});

/**
 * Compile Javascript
 */
gulp.task('script', function() {

	var assets = useref.assets();

	gulp.src('app/index.html')
		.pipe(assets)
		.pipe(ngAnnotate())
		.pipe(gulpif('*.js', ngAnnotate()))
		.pipe(uglify())
		.pipe(useref())
		.pipe(gulp.dest('app/public/js'));

});

/**
 * Watch Files
 */
gulp.task('watch', ['style'], function() {
	gulp.watch(path.public+'/scss/**/*.scss', ['style']);
});

/*
 * Clean folder BUILD
 */
gulp.task('cleanBuildFolder', function() {
	gulp.src('build/', {read: false}).pipe(rimraf());
});

/*
 * Build APP
 */
 gulp.task('build', ['cleanBuildFolder'], function() {

 	// Read package.json
    var package = require('./package.json');

    // Find out which modules to include
    var modules = [];
    if (!!package.dependencies) {
        modules = Object.keys(package.dependencies)
                .filter(function(m) { return m != 'nodewebkit' })
                .map(function(m) { return '../application/node_modules/'+m+'/**/*' })
    }

 	// Which platforms should we build
    var platforms = [];
    if (process.argv.indexOf('--win') > -1)     platforms.push('win');
    if (process.argv.indexOf('--mac') > -1)     platforms.push('osx');
    if (process.argv.indexOf('--linux32') > -1) platforms.push('linux32');
    if (process.argv.indexOf('--linux64') > -1) platforms.push('linux64');

    // Build for All platforms
    if (process.argv.indexOf('--all') > -1) platforms = [ 'win', 'osx', 'linux32', 'linux64' ];

    // If no platform where specified, determine current platform
    if (!platforms.length) { 
        if      (process.platform === 'darwin') platforms.push('osx');
        else if (process.platform === 'win32')  platforms.push('win');
        else if (process.arch === 'ia32')       platforms.push('linux32');
        else if (process.arch === 'x64')        platforms.push('linux64');
    }

 	var nw = new NwBuilder({
    	files 		: ['../application/package.json', '../application/app/**/*'].concat(modules),
    	macIcns 	: '../application/app/public/img/logoApp.icns',
    	winIco		: '../application/app/public/img/windows.ico',
    	platforms 	: platforms,
    	appName 	: 'Dragand'
  	});

	nw.on('log', function (msg) {
		util.log('node-webkit-builder', msg);
	});

	return nw.build().catch(function (err) {
		util.log('node-webkit-builder', err);
	});
});

/**
 * Default Task
 */
gulp.task('default', ['style', 'watch']);