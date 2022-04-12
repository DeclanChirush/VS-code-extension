var fs = require('fs');
var dir = "./helloWorld";

export function createFolder(){

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    var shell = require('shelljs');
    shell.mkdir('-p', 'root/parent/helloWorld');

}