exports.isAbsolute = function(path){
    if ('/' === path[0]) return true;
    if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
    if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
  };