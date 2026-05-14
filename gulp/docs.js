const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const through2 = require('through2');
const path = require('path');
const fsExtra = require('fs-extra');

// CLEAN
gulp.task('clean:docs', function (done) {
	if (fs.existsSync('./docs/')) {
		return gulp.src('./docs/', { read: false }).pipe(clean({ force: true }));
	}
	done();
});

// HTML
const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => ({
	errorHandler: notify.onError({
		title,
		message: 'Error <%= error.message %>',
		sound: false,
	}),
});

gulp.task('html:docs', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
		.pipe(changed('./docs/'))
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(webpHTML())
		.pipe(htmlclean())
		.pipe(gulp.dest('./docs/'));
});

// SCSS: structure output
gulp.task('sass:docs:structure', function () {
	return gulp
		.src(['./src/scss/**/*.scss', '!./src/scss/style.scss'])
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(webpCss())
		.pipe(groupMedia())
		.pipe(csso())
		.pipe(gulp.dest('./docs/css'));
});

// SCSS: main imports
gulp.task('sass:docs:main', function (done) {
	let imports = '';

	gulp.src(['./src/scss/**/*.scss', '!./src/scss/style.scss'])
		.pipe(
			through2.obj(function (file, _, cb) {
				const relPath = path.relative('./src/scss', file.path);
				const cssPath = relPath.replace(/\.scss$/, '.css');
				imports += `@import "${cssPath.replace(/\\/g, '/')}";\n`;
				cb();
			})
		)
		.on('finish', () => {
			const outFile = './docs/css/style.css';
			fsExtra.ensureFileSync(outFile);
			fs.writeFileSync(outFile, imports);
			done();
		});
});

// IMAGES
gulp.task('images:docs', function () {
	return gulp
		.src('./src/img/**/*')
		.pipe(changed('./docs/img/'))
		.pipe(webp())
		.pipe(gulp.dest('./docs/img/'))
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./docs/img/'))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./docs/img/'));
});

// FONTS
gulp.task('fonts:docs', function () {
	return gulp.src('./src/fonts/**/*').pipe(changed('./docs/fonts/')).pipe(gulp.dest('./docs/fonts/'));
});

// FILES
gulp.task('files:docs', function () {
	return gulp.src('./src/files/**/*').pipe(changed('./docs/files/')).pipe(gulp.dest('./docs/files/'));
});

// JS
gulp.task('js:docs', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./docs/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(babel())
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./docs/js/'));
});

// SERVER
gulp.task('server:docs', function () {
	return gulp.src('./docs/').pipe(server({ livereload: true, open: true }));
});
