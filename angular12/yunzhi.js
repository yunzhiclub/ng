// 创建一个子进程
const exec = require('child_process').exec;
// 调用 node-watch 监听模块，该模块在package.json中被定义
const watch = require('node-watch');

console.log('编译mock-api');
exec('ng build mock-api');
exec('cd dist/mock-api');
