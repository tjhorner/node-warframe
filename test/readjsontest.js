var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    fsPath = require('fs-path'),
    fs = require('fs');

var data = JSON.parse(fs.readFileSync(__dirname+"/userdata/test.json", 'utf8'));

data.forEach(function(userinfo){
    console.log("username:", userinfo.username);
    console.log("id:", userinfo.id);
    if (userinfo.rathuum == undefined) {
        console.log("score: 0");
    } else {
        console.log("score:", userinfo.rathuum);
    }
});