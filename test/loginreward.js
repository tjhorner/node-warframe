var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.loginReward(config.login.username, config.login.password, function(data){
        var reward = JSON.parse(data);
        console.log(reward);
    });
    
});