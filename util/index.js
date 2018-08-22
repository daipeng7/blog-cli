var path = require('path');
var fs = require('fs');
var swig = require('swig');

swig.setDefaults({
    cache: false,
    encoding: 'utf-8'
});

/**
 * 去掉后缀
 *
 * @param {*} name
 */
exports.stripExtname = function stripExtname(name) {
    var i = 0 - path.extname(name).length;
    if(i === 0) i = name.length;
    return name.slice(0, i);
}
/**
 * 创建目录
 *
 * @param {*} dir
 */
exports.createDirectory = function createDirectory(dir) {
    var sep = path.sep;
    var dirArray = path.dirname(dir).split(sep);
    var p = '';
    while(dirArray.length){
        p += dirArray.shift() + sep;
        if(!fs.existsSync(p)){
            fs.mkdirSync(p);
        }
    }
}
/**
 * swig renderFile
 * 
 * @param {any} file    file path
 * @param {any} data    template data
 */
exports.renderFile = function(file, data) {
    return swig.render(fs.readFileSync(file).toString(), {
        filename: file,
        autoescape: false,
        locals: data
    });
}