//1、引入gulp模块：项目构建工具
var gulp=require('gulp');
/*
var jshint = require('gulp-jshint');//js语法检查模块
var concat = require('gulp-concat');//合并文件模块
var uglify = require('gulp-uglify');//js文件压缩模块
var rename = require("gulp-rename");//文件重命名模块

var less = require('gulp-less');//less编译模块
var cleanCSS = require('gulp-clean-css');//css压缩模块，可以解决兼容性
var cssmin = require('gulp-cssmin');//css压缩模块，可以解决兼容性
var htmlmin = require('gulp-htmlmin');//html压缩模块
var livereload = require('gulp-livereload');//监视文件模块

var connect = require('gulp-connect');//热加载库
*/

// 神来之笔：其他(上面)的插件不用再引入了
var $ = require('gulp-load-plugins')();//！！！引入的插件是个方法，必须记住调用。

//自动打开网页
var open=require('open');

//less编译自动添加前缀
var LessAutoprefix = require('less-plugin-autoprefix');
//前缀兼容最新两个版本的浏览器
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

var pkg = require('./package');  //引入package.json文件，并转化为js对象
var jshintConfig = pkg.jshintConfig; //拿到jshintConfig属性

//2、定义默认任务
/*
* 回调函数中，指定return为异步执行；
*   如果没有指定return为同步执行
* */
//1.语法检查的任务
gulp.task('jshint',function(){
  // 任务的具体内容
  return gulp.src('src/js/*.js') //将指定文件加载到内存中（数据流）
    .pipe($.jshint(jshintConfig))  //语法检查：通过流的方式检查
    .pipe($.jshint.reporter('default'))  //语法检查的报错规则
    // .pipe(livereload())
    .pipe($.connect.reload())

});
//2.合并文件任务
gulp.task('js',['jshint'],function(){
  //['jshint']必须先执行，再执行本身的回调函数
  return gulp.src('src/js/*.js')
    .pipe($.concat('built.js',{newLine:';'}))  //合并后的文件名，储存在流中
    .pipe(gulp.dest('build/js'))  //将内存中的数据流输出到指定路径
    .pipe($.uglify())   //将现在数据流中的文件压缩
    .pipe($.rename('dist.min.js')) //将数据流中的文件改名
    .pipe(gulp.dest('dist/js'))  //将内存中的数据流输出到指定路径
    // .pipe(livereload())
    .pipe($.connect.reload())
});
//3.less编译任务
gulp.task('less',function(){
  return gulp.src('src/css/*less')
    .pipe($.less({plugins: [autoprefix]}))
    .pipe($.rename({extname:'.css'}))
    .pipe(gulp.dest('build/css'))
    // .pipe(livereload())css
    .pipe($.connect.reload())
});
//4.css压缩任务
gulp.task('css',['less'],function(){
  return gulp.src('build/css/*.css')
    .pipe($.concat('dist.min.css'))
    .pipe($.cssmin()) //兼容ie8
    .pipe(gulp.dest('dist/css'))
    // .pipe(livereload())
    .pipe($.connect.reload())
});
//5.html压缩任务
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe($.htmlmin({collapseWhitespace: true,removeComments:true}))
    .pipe(gulp.dest('dist'))
    // .pipe(livereload())
    .pipe($.connect.reload())
});

//6.半自动加载

gulp.task('watch',['default'],function(){
  //开启监听
  livereload.listen();
  //监听的任务
  gulp.watch('src/js/!*.js',['js']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
  gulp.watch('src/less/!*.less',['css']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
  gulp.watch('src/!*.html',['html']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
});


//7.热加载，替代半自动加载
gulp.task('hotReload',['default'], function () {
  $.connect.server({
    root: 'dist', //根目录路径
    port: 4000,   //开启服务器的端口号
    livereload: true   //热更新：实时更新
  });
  //监听的任务
  gulp.watch('src/js/*.js',['js']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
  gulp.watch('src/css/*.less',['css']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
  gulp.watch('src/*.html',['html']);  //监听指定文件，一旦发生改变，就会调用执行后面的任务
  //8.自动打开指定网页
  open('http:localhost:4000');
});

//3、应用任务
gulp.task('default', ['js','css','html']); //异步执行
// gulp.task('myWatch', ['default','watch']); //异步执行
gulp.task('myHotReload', ['default','hotReload']); //应用热更新，异步执行