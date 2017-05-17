import yargs from 'yargs'; // 命令行工具

const args = yargs
      // 区分 线上环境／开发环境
      .option('production', {
          boolean: true,
          default: false, // 默认为开发环境
          describe: 'min all scripts'
      })
      // 文件监听
      .option('watch', {
          boolean: true,
          default: false,
          describe: 'watch all files'
      })
      // 命令行日志
      .option('verbose', {
          boolean: true,
          default: false,
          describe: 'log'
      })
      // 代码源映射
      .option('sourcemaps', {
          describe: 'force the creation of sourcemaps'
      })
      // 设置服务器端口
      .option('port', {
          string: true,
          default: 8080,
          describe: 'server port'
      })

      .argv;

export default args;