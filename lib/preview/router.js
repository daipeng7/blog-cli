var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var rd = require('rd');
var config = require('./config');
var { stripExtname, createDirectory } = require('../../util');
var { markdownToHTML, insertToHtmlTemplate } = require('../../util/markdow');
var { renderFile } = require('../../util/index');

/**
 * 获取-写入html文件的地址
 * 
 * @param {any} filename 
 * @returns 
 */
function getWritePath(filename) {
    return path.resolve(config.assetsPath, filename + '.html');
}

/**
 * preview router
 *
 * @param {*} dir
 * @returns {router}
 */
module.exports = function(dir) {

    dir = dir || '';

    /**
     * 渲染文章
     *
     * @param {req, res, next}
     * @returns {null}
     */
    router.get('/posts/*', function(req, res, next) {

        var param = req.params[0];
        var name = stripExtname(param);
        var file = path.resolve(dir, config.sourceDir, name + '.md');
        fs.readFile(file, { encoding: 'utf8' }, function(err, content) {

            if(err) return next(err);

            var html = markdownToHTML(content.toString());

            var writePath = getWritePath(name);

            var fullHtml = renderFile(path.resolve(dir, config.templateDetailPath), {
                post: {
                    title: path.basename(file, '.md'),
                    content: html
                }
            });

            createDirectory(writePath);

            fs.writeFile(writePath, fullHtml, { encoding: 'utf8', flag: 'w' }, function(err, data) {
                if(err) throw err;
            });

            res.cookie('Cho', 'Kim', { signed: true });

            res.end(fullHtml, 'utf8');
        });

    });

    /**
     * 渲染文章列表
     *
     * @param {req, res, next}
     * @returns {null}
     */
    router.get('/', function(req, res, next) {

        var list = [];
        
        var sourceDir = path.resolve(dir, config.sourceDir);
        var _sep = path.sep;
        
        rd.eachFileFilterSync(sourceDir, /\.md$/, function(filename, stats) {
            
            var url = config.baseUrl + '/posts/' + stripExtname(filename.slice(sourceDir.length + 1)) + '.html';
            list.push(path.normalize(url));

        });

        list.sort();
        console.log('list==> %o', list);

        var writePath = path.resolve(dir, config.templateListPath);

        createDirectory(writePath);

        var fullHtml = renderFile(writePath, {
            post: {
                title: '博客列表',
                content: list
            }
        });

        res.end(fullHtml);
    });

    return router;
};