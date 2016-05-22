/*
Run:

$ APP_ENV={environment} gulp {task}

e.g:	APP_ENV=qa gulp build

APP_ENV could be:
-dev
-pro
-qa

-The 'default' task is for development, must be faster.
-The 'build' task if for deployment, compiles everything.
*/
import gulp					  from 'gulp';
import rm							from 'gulp-rimraf';
import uglify					from 'gulp-uglify';
import minifyCss			from 'gulp-minify-css';
import concat					from 'gulp-concat';
import gulpsync				from 'gulp-sync';
import eslint					from 'gulp-eslint';
import ignore 				from 'gulp-ignore';
import mainBowerFiles from 'main-bower-files';
import webpack 				from 'webpack-stream';

const sync = gulpsync(gulp).sync;

let COMMON_PATH = 'dist';
let DEST_JS = `${COMMON_PATH}/js`;
let DEST_FONTS = `${COMMON_PATH}/fonts`;
let DEST_CSS = `${COMMON_PATH}/css`;

//delete dist folder
gulp.task('clean', () => {
	return gulp.src( `${COMMON_PATH}/*`, { read: false })
	.pipe(ignore('.gitignore'))
	.pipe(rm({ force: true }));
});


// ******************* CUSTOM ASSETS	************************

// compile react es7 assets to js
gulp.task('compile', () => {
	return gulp.src('./src/js/App.jsx')
	.pipe(webpack( require('./webpack.config.dev.js') ))
	.pipe(gulp.dest(DEST_JS));
});

// compiles REACT (es7) and SASS
gulp.task('compile:pro', () => {
	return gulp.src('./src/js/App.jsx')
	.pipe(webpack( require('./webpack.config.pro.js') ))
	.pipe(gulp.dest(DEST_JS));
});

// ******************* CUSTOM ASSETS	************************


// ******************* VENDORS ASSETS	************************

//copy bootstrap's and font-awesome fonts to dist/fonts
gulp.task('copy-fonts', () => {
	return gulp.src([
		'libs/font-awesome/fonts/**.*',
		'libs/bootstrap/fonts/**.*'
	])
	.pipe(gulp.dest(DEST_FONTS));
});

//compile all the css files from bower
gulp.task('vendor-styles', () => {
	return gulp.src(mainBowerFiles('**/*.css'), { base: 'libs' })
	.pipe(concat('vendor-styles.css'))
	.pipe(minifyCss({ keepSpecialComments: 0 }))
	.pipe(gulp.dest(DEST_CSS));
});

//compile all scripts files from bower
gulp.task('vendor-scripts', () => {
	return gulp.src(mainBowerFiles('**/*.js'), { base: 'libs' } )
	.pipe(concat('vendor-scripts.js'))
	.pipe(uglify())
	.pipe(gulp.dest(DEST_JS));
});

// ******************* VENDORS ASSETS	************************

/*
review javascript code
Please check the .eslintrc file to see the rules.

"off" or 0 - turn the rule off
"warn" or 1 - turn the rule on as a warning
(doesn’t affect exit code)
"error" or 2 - turn the rule on as an error
(exit code is 1 when triggered)
*/
gulp.task('lint', () => {
	return gulp.src('src/js/**/*.jsx')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});


// allows to run eslint and unit testing
gulp.task('tests', ['lint']);

gulp.task('compile-app', sync(['lint', [
	'compile:pro'
]]));


//compile ALL the app for the deployment
gulp.task('build', sync(['clean', [
	'copy-fonts',
	'compile-app'
]]));

//task for development
gulp.task('default', ['compile-app']);
