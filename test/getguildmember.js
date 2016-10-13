var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    warframe.getGuild(function(view){
        var guild = JSON.parse(view);
        guild.Members.forEach(function(member){
            console.log("username:", member.DisplayName.green, "id:", member._id.$id);
        });
    });
});