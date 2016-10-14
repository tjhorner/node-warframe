var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true }),
    fsPath = require('fs-path');

var config = require('./test_config.json');
var userdata = [];
var event = 0;

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.getGuild(function(view){
        
        var guild = JSON.parse(view);
        var counter = 0;
        
        guild.Members.forEach(function(member){
            
            warframe.viewPlayer(config.login.username, config.login.password, member._id.$id, function(data){
                
                var playerinfo = JSON.parse(data);
                
                //console.log('"username": ' + '"' + member.DisplayName + '"');
                //console.log('"id": ' + '"' + member._id.$id + '"');
                try {
                    if (playerinfo.KelaEventBonusScoreMax == undefined) {
                        //console.log('"Rathuum": 0\r\n');
                        event = 0;
                    } else {
                        //console.log('"Rathuum": ' + playerinfo.KelaEventBonusScoreMax + "\r\n");
                        event = playerinfo.KelaEventBonusScoreMax;
                    }
                } catch (err) {
                    //console.log('error');
                };
                
                userdata.push({"username": member.DisplayName, "id": member._id.$id, "rathuum": event});
                fsPath.writeFile(__dirname+"/userdata/test.json", JSON.stringify(userdata), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                 });
                
            });
            
        });
        
    });
    
});