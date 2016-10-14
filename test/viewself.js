var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.viewSelf(config.login.username, config.login.password, function(data){
        var playerinfo = JSON.parse(data);
        console.log(playerinfo);
    });
    
});