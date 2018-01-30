var gulp = require('gulp');
var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var shortColor = require('postcss-short-color');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');

gulp.task('css', function () {
  var processors = [
    autoprefixer,
    cssnext,
    precss,
    shortColor,
    atImport,
    mqpacker,
    cssnano
  ];
  return gulp.src('./src/stylesheet/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/stylesheet'));
})

gulp.task('html', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: false,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  return gulp.src('./src/html/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./dist/html'));
})

gulp.task('javascript', function () {
  return gulp.src('./src/javascript/*.js')
    .pipe(gulp.dest('./dist/javascript'));
})

// gulp.task('image', function () {
//   gulp.src('./src/images/*.{png,jpg,gif,ico}')
//       .pipe(imagemin({
//           optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//           progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//           interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//           multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//       }))
//       .pipe(gulp.dest('./dist/images'));
// });

gulp.task('default', function () {
  gulp.run('css', 'html', 'javascript');
})

gulp.watch('./src/stylesheet/*.css', function () {
  gulp.run('css');
})
gulp.watch('./src/html/*.html', function () {
  gulp.run('html');
})