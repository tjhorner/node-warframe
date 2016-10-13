var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.viewPlayer(config.login.username, config.login.password, warframe.currentAccount.id, function(data){
        var playerinfo = JSON.parse(data);
        console.log(playerinfo);
    });
    
});