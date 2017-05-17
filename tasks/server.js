import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args.js';

gulp.task('serve', (cb)=>{
    if(!args.watch) return cb();
    // 监听状态下，开启服务
    var server = liveserver.new(['--harmony', 'server/bin/www']);
    server.start();
    // 监听server下的js和ejs，并自动刷新
    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file) {
        server.notify.apply(server, [file]);
    });
    // 监听需要重启服务的文件，并重启服务
    gulp.watch(['server/routes/**/*.js', 'server/app.js'], function() {
        server.start.bind(server)();
    });
});