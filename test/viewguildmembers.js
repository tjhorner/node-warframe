var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.getGuild(function(view){
        
        var guild = JSON.parse(view);
        var counter = 0;
        
        guild.Members.forEach(function(member){

            warframe.viewPlayer(config.login.username, config.login.password, member._id.$id, function(data){
                console.log("username:", member.DisplayName, "id:", member._id.$id);
                var playerinfo = JSON.parse(data);
                console.log(playerinfo);
                console.log(counter++);
            });
            
        });
        
    });
});