const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const through2 = require('through2');
const path = require('path');
const fsExtra = require('fs-extra');

// CLEAN
gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return gulp.src('./build/', { read: false }).pipe(clean({ force: true }));
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

gulp.task('html:dev', function () {
	return gulp
		.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
		.pipe(plumber(plumberNotify('HTML')))
		.pipe(fileInclude(fileIncludeSetting))
		.pipe(gulp.dest('./build/'));
});

// SCSS structure — build/css mirrors src/scss
gulp.task('sass:dev:structure', function () {
	return gulp
		.src(['./src/scss/**/*.scss', '!./src/scss/style.scss'])
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(gulp.dest('./build/css'));
});

// SCSS main: generate automatic style.css with imports
gulp.task('sass:dev:main', function (done) {
	let files = [];

	gulp.src(['./src/scss/**/*.scss', '!./src/scss/style.scss'])
		.pipe(
			through2.obj(function (file, _, cb) {
				files.push(file.path);
				cb();
			})
		)
		.on('finish', () => {
			// СОРТИРОВКА: чтобы было по порядку, как в ФС
			files.sort((a, b) => a.localeCompare(b));

			let imports = '';

			files.forEach((filePath) => {
				const relPath = path.relative('./src/scss', filePath);
				const cssPath = relPath.replace(/\.scss$/, '.css');
				imports += `@import "${cssPath.replace(/\\/g, '/')}";\n`;
			});

			const outFile = './build/css/style.css';

			fsExtra.ensureFileSync(outFile);
			fs.writeFileSync(outFile, imports);

			done();
		});
});

// IMAGES
gulp.task('images:dev', function () {
	return gulp.src('./src/img/**/*').pipe(changed('./build/img/')).pipe(gulp.dest('./build/img/'));
});

// FONTS
gulp.task('fonts:dev', function () {
	return gulp.src('./src/fonts/**/*').pipe(changed('./build/fonts/')).pipe(gulp.dest('./build/fonts/'));
});

// FILES
gulp.task('files:dev', function () {
	return gulp.src('./src/files/**/*').pipe(changed('./build/files/')).pipe(gulp.dest('./build/files/'));
});

// JS
gulp.task('js:dev', function () {
	return gulp
		.src('./src/js/*.js')
		.pipe(changed('./build/js/'))
		.pipe(plumber(plumberNotify('JS')))
		.pipe(webpack(require('./../webpack.config.js')))
		.pipe(gulp.dest('./build/js/'));
});

// SERVER
const browserSync = require('browser-sync').create();
gulp.task('server:dev', function (done) {
	browserSync.init({
		server: {
			baseDir: './build',
		},
		open: true,
		notify: false
	});
	done();
});
// WATCH
gulp.task('watch:dev', function (done) {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev:structure', 'sass:dev:main')).on('change', browserSync.reload);
	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev')).on('change', browserSync.reload);
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev')).on('change', browserSync.reload);
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev')).on('change', browserSync.reload);
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev')).on('change', browserSync.reload);
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev')).on('change', browserSync.reload);
	done();
});