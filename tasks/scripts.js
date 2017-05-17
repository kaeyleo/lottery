import gulp from 'gulp'; // 自动化任务构建工具
import gulpif from 'gulp-if'; // 为gulp提供语句判断功能的插件
import concat from 'gulp-concat'; // 代码合并
import webpack from 'webpack'; // 模块化管理
import gulpWebpack from 'webpack-stream'; // 能在gulp中用webpack的模块，需要依赖上面的webpack
import named from 'vinyl-named'; // 文件命名
import livereload from 'gulp-livereload'; // 浏览器同步更新
import plumber from 'gulp-plumber'; // node管道流的补丁
import rename from 'gulp-rename'; // 文件重命名
import uglify from 'gulp-uglify'; // 代码压缩
import {log, colors} from 'gulp-util'; // 命令行输出工具
import args from './util/args.js'; // 命令行参数解析

/* ---------------------
 * Gulp API 简述
 * gulp.task(...) 定义任务
 * gulp.watch(...) 监视文件，并在文件发生改动时做一些事情
 * gulp.src(...) 匹配（读入）要处理的文件
 * gulp.dest(...) 把处理好的文件写入到目标地址（目录）
 *----------------------*/ 

gulp.task('scripts', ()=>{
    return gulp.src('app/js/index.js')
      .pipe(plumber())
      .pipe(named())
      .pipe(gulpWebpack({
          module: {
              loaders: [{
                  test: /.\.js$/,
                  loader: 'babel'
              }]
          }
      }), null, (err, stats)=>{
          log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
              chunks: false
          }))
      })
      .pipe(gulp.dest('server/public/js'))
      .pipe(rename({
          basename: 'cp',
          extname: '.min.js'
      }))
      .pipe(uglify())
      .pipe(gulp.dest('server/public/js'))
      .pipe(gulpif(args.watch, livereload()));
});