var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var swig = require('swig');
var config = require('./config');
var { stripExtname, createDirectory } = require('../../util');
var { markdownToHTML, insertToHtmlTemplate } = require('../../util/markdow');

swig.setDefaults({
    cache: false,
    encoding: 'utf-8'
});
/**
 * preview router
 *
 * @param {*} dir
 * @returns {router}
 */
module.exports = function(dir) {

    dir = dir || '';
    // 渲染文章
    router.get('/posts/*', function(req, res, next) {

        var param = req.params[0];
        var name = stripExtname(param);
        var file = path.resolve(dir, '_posts', name + '.md');
        fs.readFile(file, { encoding: 'utf8' }, function(err, content) {
            if(err) return next(err);
            var html = markdownToHTML(content.toString());
            var writePath = path.resolve(config.assetsPath, name + '.html');
            var fullHtml = insertToHtmlTemplate(html);
            createDirectory(writePath);
            fs.writeFile(writePath, fullHtml, { encoding: 'utf8', flag: 'w' }, function(err, data) {
                if(err) throw err;
            });
            res.cookie('Cho', 'Kim', { signed: true });
            res.end(fullHtml, 'utf8');
        });

    });

    // 渲染列表
    router.get('/', function(req, res) {

        console.log('cookies==> %o', req.cookies);
        console.log('signedCookies==> %o', req.signedCookies);
        res.end('文章列表');

    });

    return router;
};