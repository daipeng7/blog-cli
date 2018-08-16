#!/usr/bin/env node

const program = require('commander');

// version
program.version('1.0.0');


// help
program
    .command('help')
    .description('显示使用帮助')
    .action(function() {
        program.outputHelp();
    });

// create
program
    .command('create [dir]')
    .description('创建一个空的博客')
    .action(function(dir) {
        console.log('create %s', dir);
    });
// preview
program
    .command('preview [dir]')
    .description('实时预览')
    .action(require('../lib/preview'));

// build
program
    .command('build [dir]')
    .description('生成目录下的静态HTML')
    .option('-o --output [dir]', '生成的静态HTML存放目录')
    .action(function(dir, options) {

    });

// 开始解析命令
program.parse(process.argv);