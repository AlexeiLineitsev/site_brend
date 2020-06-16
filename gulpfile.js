'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');;



gulp.task('sass', () => {
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('imagemin', () => {
    return gulp.src('app/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', () => {
    return gulp.src(['app/index.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('script', () => {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});


gulp.task('watch', () => {
    gulp.watch('app/scss/*/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('svgSpriteBuild', function () {
    return gulp.src('app/img/*.svg')
        // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    // render: {
                    //     scss: {
                    //         dest:'app/scss/_sprite.scss',
                    //         template:"app/scss/templates/_sprite_template.scss"
                    //     }
                    // }
                }
            }
        }))
        .pipe(gulp.dest('dist/img/sprite/'));
});

gulp.task('default', gulp.parallel('sass', 'js','browser-sync', 'watch', 'imagemin', 'script', 'html', 'svgSpriteBuild'));