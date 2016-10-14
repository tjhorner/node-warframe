var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    fs = require('fs');

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    const readline = require('readline');
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('accountId of the user you want to read: ', (answer) => {
        // TODO: Log the answer in a database
        console.log('given id:', answer);
        
        warframe.viewPlayer(config.login.username, config.login.password, answer, function(data){
            var playerinfo = JSON.parse(data);
            
            fs.writeFile(answer+".txt", JSON.stringify(playerinfo), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(answer+".txt saved");
            }); 
        });
        
        
    });
    
});