var gulp 				= require('gulp');
	scss 				= require('gulp-sass'),
	autoprefixer 		= require('gulp-autoprefixer'),
	minifyCSS 			= require('gulp-minify-css'),
	rename				= require('gulp-rename'),
	NwBuilder 			= require('node-webkit-builder'),
	util				= require('gulp-util'),
	del		 			= require('del'),
	useref				= require('gulp-useref'),
	uglify				= require('gulp-uglify'),
	gulpif				= require('gulp-if'),
	ngAnnotate			= require('gulp-ng-annotate'),
	ngHtml2Js 			= require("gulp-ng-html2js"),
	shell 				= require('gulp-shell'),
	pkg 				= require('./app/package.json'),
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
 * Add in Cache all view
 */
gulp.task('view', function() {
	gulp.src('app/views/*.html')
		.pipe(ngHtml2Js({
			moduleName: "daw",
			prefix: "views/"
		}))
		.pipe(gulp.dest("app/views/dist"));
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
gulp.task('clean', function() {
	del('build/');
});

/*
 * Build APP
 */
gulp.task('build', ['clean'], function() {

	shell.task('ulimit -n 2560');

	// Find out which modules to include
	var modules = [];
	if (!!pkg.dependencies) {
		modules = Object.keys(pkg.dependencies)
			.filter(function(m) { return m != 'nodewebkit' })
			.map(function(m) { return './app/node_modules/'+m+'/**/*' })
	}

	var nw = new NwBuilder({
		appName: pkg.window.title,
		appVersion: pkg.version,
		buildDir: 'build',
		macZip: true,
		files: [
			'./app/package.json',
			'./app/languages/**/*',
			'./app/index.html',
			'./app/views/**/*',
			'./app/public/**/*',
			'./app/node_modules/**/*'
		],
		macIcns: 'app/public/img/logoApp.icns',
		winIco: 'app/public/img/logoApp.ico',
		platforms: ['win', 'osx'],
		version: '0.12.1'
	});

	nw.on('log', util.log);

	return nw.build().catch(util.log);
});

/*
 * Task for launch the application
 */
gulp.task('serve', shell.task([
	'./node_modules/nw/bin/nw ./app'
]));

/**
 * Default Task
 */
gulp.task('default', ['style', 'watch', 'serve']);