const { spawn, exec } = require('child_process');
// 调用 node-watch 监听模块，该模块在package.json中被定义
const watch = require('node-watch');

exec('ng build mock-api', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  process.chdir('dist/mock-api');
  exec('npm link', (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    process.chdir('../../projects/sample');
    exec('pwd', (error, stdout) => {
      console.log(`stdout: ${stdout}`);
    });
    exec('npm link @yunzhi/ng-mock-api', (error, stdout) => {
      console.log(`stdout: ${stdout}`);
      exec(`ng build --watch --configuration production`, (error, stdout) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    });
  });
});
