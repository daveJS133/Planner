/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['copy-views', 'copy-models', 'copy-routes', 'copy-images', 'styles', 'lint', 'scripts'], function() {
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('views/**/*.ejs', ['copy-views']).on('change', browserSync.reload);
	gulp.watch('./dist/**.ejs').on('change', browserSync.reload);

	gulp.task('browser-sync', function() {
		browserSync.init({
			proxy: 'yourlocal.dev'
		});
	});
});

gulp.task('dist', [
	'copy-views',
	'copy-routes',
	'copy-models',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/public/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/public/js'));
});

gulp.task('copy-views', function() {
	gulp.src('./views/**/*.ejs')
		.pipe(gulp.dest('./dist/views'));
});

gulp.task('copy-routes', function() {
	gulp.src('./routes/**/*.js')
		.pipe(gulp.dest('./dist/routes'));
});

gulp.task('copy-models', function() {
	gulp.src('./models/**/*.js')
		.pipe(gulp.dest('./dist/models'));
});



gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('./dist/public/img'));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/public/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

gulp.task('tests', function () {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});