import gulp from 'gulp';
import del from 'del'; // 删除任务
import args from './util/args.js';

gulp.task('clean', ()=>{
    return del(['server/public', 'server/views']);
});
