
var MarkdownIt = require('markdown-it');

var md = new MarkdownIt({
    html: true,
    langPrefix: 'code-'
});

/**
 * markdown转换为html
 *
 * @param {*} content
 */
exports.markdownToHTML = function markdownToHTML(content) {
    return md.render(content || '');
}
/**
 * 将内容插入html模版
 *
 * @param {*} content
 */
exports.insertToHtmlTemplate = function insertToHtmlTemplate (content) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            ${content}
        </body>
        </html>`;
}