import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'; // 串行任务工具

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'serve']));