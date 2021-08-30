// 获取执行子线程
const {exec} = require('child_process');
// 调用 node-watch 监听模块，该模块在package.json中被定义
const watch = require('node-watch');
let running = false;
let linked = false;

// 初始化方法
function init() {
  // 保障只有一个动作在执行
  if (running) {
    return;
  }
  running = true;

  // build theme
  exec('ng build theme', (error, stdout) => {
    if (error) {
      console.log(`stdout: ${error.message}`)
      running = false;
      return;
    }
    console.log(`stdout: ${stdout}`);
    process.chdir('dist/theme');

    // link mock-theme to node modules
    exec('npm link', (error, stdout) => {
      if (error) {
        console.log(`stdout: ${error.message}`)
        running = false;
        return;
      }

      if (!linked) {
        // 初始化的时候link一次
        linked = true;
        console.log(`stdout: ${stdout}`);
        process.chdir('../../projects/sample');
        exec('pwd', (error, stdout) => {
          console.log(`stdout: ${stdout}`);
        });

        // link mock-api from node modules
        exec('npm link @yunzhi/ng-theme', (error, stdout) => {
          console.log(`stdout: ${stdout}`);
          running = false;
        });

        process.chdir('../../');
      }
    });

  });
}

init();

console.log('监听theme中的文件是否发生变化，发生变化则重新构建');
watch(['projects/theme/src'], {recursive: true}, () => {
  console.log(new Date().toTimeString());
  init();
});




