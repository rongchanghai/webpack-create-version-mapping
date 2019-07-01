/**
 * 
 *
 */
function CreateVersionsMapping(options) { // 根据 options 配置你的插件
}
CreateVersionsMapping.prototype.apply = function (compiler) {
  compiler.plugin("compile", function (params) {
  });
  compiler.plugin("compilation", function (compilation) {
    compilation.plugin("optimize", function () {
    });
  });

  compiler.plugin("emit", function (compilation, callback) {
    // 创建一个头部字符串：
    let fileList = '';
    for (var filename in compilation.assets) {
      const reg = /([0-9a-z]+)@([0-9a-z]+)\.((?:js|css)$)/
      const matchList = filename.match(reg);
      if(matchList){
        filename = `${matchList[1]}.${matchList[3]}#${matchList[2]}`;
        fileList += (filename + '\n');
      }
    }
    // 把它作为一个新的文件资源插入到 webpack 构建中：
    compilation.assets['versions.mapping'] = {
      source: function () {
        return fileList;
      },
      size: function () {
        return fileList.length;
      }
    };
    callback();
  });
};

module.exports = CreateVersionsMapping;