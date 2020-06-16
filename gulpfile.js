let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
return gulp.src([
    'node_modules/jquery/dist/jquery.min.js'
])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('default', gulp.parallel('sass', 'js','browser-sync', 'watch'));

