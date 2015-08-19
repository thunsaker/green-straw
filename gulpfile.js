var gulp = require('gulp'),
    del = require('del'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload');

var src = 'src/';
var dest = 'dist/';

gulp.task('default', ['clean'], function() {
    gulp.start('render', 'copy');
});

gulp.task('clean', function(cb) {
    del([dest], cb);
});

gulp.task('copy', ['copy-js'], function() {
    // css
    gulp.src([
            src + 'res/*.css'
        ])
        .pipe(gulp.dest(dest + 'res'));

    // img
    gulp.src([
            src + 'img/*.*'
        ])
        .pipe(gulp.dest(dest + 'img'));

    // misc
    gulp.src([
            src + 'misc/**'
        ])
        .pipe(gulp.dest(dest));
});

gulp.task('copy-js', function() {
    gulp.src([
            src + 'js/*.js'
        ])
        .pipe(gulp.dest(dest + 'js'));
});

gulp.task('render', ['jade', 'stylus']);

gulp.task('jade', function() {
    gulp.src(src + '*.jade')
        .pipe(jade())
        .pipe(gulp.dest(dest));
});

gulp.task('stylus', function() {
    gulp.src(src + 'res/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest(dest + 'res'));
});


gulp.task('watch', ['default'], function() {
    gulp.watch(src + '*.jade', ['jade']);
    gulp.watch(src + 'res/*.styl', ['stylus']);
    gulp.watch(src + 'js/*.js', ['copy-js']);

    livereload.listen();
    gulp.watch([dest + '**']).on('change', livereload.changed);
});
