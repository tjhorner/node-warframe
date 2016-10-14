var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    console.log("Auth nonce:", warframe.currentAccount.Nonce);
    console.log("accountId:", warframe.currentAccount.id);
    
});