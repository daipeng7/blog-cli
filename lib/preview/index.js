var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var fs = require('fs');
var router = require('./router');
var config = require('./config');
var bodyParser = require('body-parser');
// var multer = require('multer'); // 这个最好不要作为全局中间件，应该是某一个特定的路由下的中间件
var cookieParser = require('cookie-parser'); // 全局cookie设置

module.exports = function(dir) {
    dir = dir || config.srcPath;
    var app = express();

    // body解析中间件
    app.use(bodyParser.json());

    // 全局cookie中间件
    app.use(cookieParser(config.cookieSign));

    // 设置静态文件路径
    app.use('/assets', serveStatic(path.resolve(config.assetsPath)));

    // 设置路由
    app.use(config.baseUrl, router(dir));
    
    app.listen(3000, function() {
        console.log('启动成功！');
    });
}

