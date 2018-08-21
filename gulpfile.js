//引入gulp模块
const gulp = require('gulp');
// gulp-load-plugins 可代替gulp的所有插件
var $ = require('gulp-load-plugins')();
// const jshint = require('gulp-jshint');
// const babel = require('gulp-babel');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const rename = require("gulp-rename");
// const less = require('gulp-less');
// const cssmin = require('gulp-cssmin');
// const htmlmin = require('gulp-htmlmin');
// const livereload = require('gulp-livereload');
// const connect = require('gulp-connect');
// const open = require("open");
const rev = require('gulp-rev');
const opn = require("opn");

//定义默认任务
//设置语法检查任务
gulp.task('jshint', function() {
   return gulp.src('./src/js/*.js')
        .pipe($.jshint({ "esversion": 6}))
        .pipe($.jshint.reporter('default'));
});

//设置babel任务,将ES6语法转换成ES5语法,同时为了保证jshint 在babel之前,需在中间加入jshint
gulp.task('babel',['jshint'], function() {
    return  gulp.src('src/js/*.js')
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('./build/js'))
});

//设置合并js代码的任务
gulp.task('concat', ['babel'], function() {
    return gulp.src(['build/js/module1.js','build/js/module2.js'])
        .pipe($.concat('built.js'))
        .pipe(gulp.dest('./build/js'));
});

//设置压缩任务
//设置压缩js代码的任务
gulp.task('uglify', ['concat'], function() {
    return gulp.src(['build/js/built.js'])
        .pipe($.uglify())
        .pipe($.rename('dist.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

// 整合js代码
gulp.task('minifyjs', function() {
    return gulp.src('./src/js/*.js')
        .pipe($.jshint({ "esversion": 6}))
        .pipe($.jshint.reporter('default'))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build/js'))
        // .pipe($.concat('built.js')) // 合并js代码
        .pipe(gulp.dest('./build/js'))
        .pipe($.uglify())
        // .pipe($.rename('dist.min.js')) //重命名
        .pipe(gulp.dest('./dist/js'))
        .pipe($.livereload());
});

gulp.task('minifycss', function () {
    return gulp.src('./src/less/*.less')
        .pipe($.less({
            plugins: [
                new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            ]
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe($.concat('built.css'))
        .pipe(gulp.dest('build/css'))
        .pipe($.cssmin())
        .pipe($.rename('dist.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe($.livereload());
});

gulp.task('minifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe($.htmlmin({
            removeComments:true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe($.livereload());
});

gulp.task('watch',['default'], function () {
    $.livereload.listen();
    $.connect.server({
        root: 'dist',
        livereload: true,
        port: 4000,
    });
    opn('http://localhost:4000');
    gulp.watch('src/less/*.less', ['minifycss']);
    gulp.watch('src/js/*.js', ['minifyjs']);
    gulp.watch('src/*.html', ['minifyhtml']);
});

gulp.task('default', ['minifyjs','minifycss','minifyhtml']); //异步执行