// 获取执行子线程
const {exec} = require('child_process');
// 调用 node-watch 监听模块，该模块在package.json中被定义
const watch = require('node-watch');
let running = false;

// 初始化方法
function init() {
  // 保障只有一个动作在执行
  if (running) {
    return;
  }
  running = true;

  // build mock-api
  exec('ng build mock-api', (error, stdout) => {
    if (error) {
      console.log(`stdout: ${error.message}`)
      return;
    }
    console.log(`stdout: ${stdout}`);
    process.chdir('dist/mock-api');

    // link mock-api to node modules
    exec('npm link', (error, stdout) => {
      console.log(`stdout: ${stdout}`);
      process.chdir('../../projects/sample');
      exec('pwd', (error, stdout) => {
        console.log(`stdout: ${stdout}`);
      });

      // link mock-api from node modules
      exec('npm link @yunzhi/ng-mock-api', (error, stdout) => {
        console.log(`stdout: ${stdout}`);
        process.chdir('../mock-api/testing');
        exec('npm link @yunzhi/ng-mock-api', (error, stdout) => {
          if (error) {
            console.error(error.message);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
        process.chdir('../../../');
        running = false;
      });
    });
  });
}

init();

// 监听mock-api中的文件是否发生变化，发生变化则重新构建
watch(['projects/mock-api'], {recursive: true}, () => {
  init();
});




