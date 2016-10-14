var Warframe = require("../index"),
    warframe = new Warframe({ storeAccount: true }),
    config = require("./test_config.json"),
    express = require('express'),
    app = express(),
    engines = require('consolidate'),
    assert = require('assert'),
    jquery = require('jquery');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

    var wfdata = [];
    
    warframe.login(config.login.username, config.login.password, function(res){
    
        warframe.getGuild(function(view){

            var guild = JSON.parse(view);
            var counter = 0;

            guild.Members.forEach(function(member){

                warframe.viewPlayer(config.login.username, config.login.password, member._id.$id, function(data){

                    var playerinfo = JSON.parse(data);

                    console.log('"username": ' + '"' + member.DisplayName + '"');
                    wfdata.push('"username": ' + '"' + member.DisplayName + '"');
                    console.log('"id": ' + '"' + member._id.$id + '"');
                    wfdata.push('"id": ' + '"' + member._id.$id + '"');
                    try {
                        if (playerinfo.KelaEventBonusScoreMax == undefined) {
                            console.log('"Rathuum": 0\n');
                            wfdata.push('"Rathuum": 0\n');
                        } else {
                            console.log('"Rathuum": ' + playerinfo.KelaEventBonusScoreMax + "\n");
                            wfdata.push('"Rathuum": 0\n');
                        }
                    } catch (err) {
                        console.log('error');
                    };

                    //console.log(playerinfo);
                    //console.log(counter++);

                });

            });

        });

    });
    


app.get('/', function(req, res){
        res.render("index", {"data": wfdata});
});

app.use(function(req, res){
    res.sendStatus(404);
});
    
var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

/* warframe.login(config.login.username, config.login.password, function(res){  
    
    console.log("Auth nonce:", warframe.currentAccount.Nonce)
    
}); */

/* warframe.login(config.login.username, config.login.password, function(res){  
    
    console.log("Welcome,", warframe.currentAccount.DisplayName.cyan);
    console.log("Auth nonce:", warframe.currentAccount.Nonce)
    
    warframe.loginReward(function(days){
        
        var stuff = JSON.parse(days);
        var daysleft = stuff.DailyTributeInfo.NextMilestoneDay - stuff.DailyTributeInfo.LoginDays;
        console.log("Days:", stuff.DailyTributeInfo.LoginDays);
        console.log("Next Milestone:", stuff.DailyTributeInfo.NextMilestoneDay);
        console.log("Days left until next Milestone:", daysleft);
        try {
            console.log("reward:\n",reward.DailyTributeInfo.Rewards[0].StoreItemType);
        } catch (err) {
            console.log("reward already received")
        }
        
        console.log("debug days:\n\n",days)
    });
    //loginReward end
    
    
    
    /* warframe.getGuild(function(view){
        var guild = JSON.parse(view);
        guild.Members.forEach(function(member){
            console.log("username:", member.DisplayName.green, "id:", member._id.$id);
        });
    }); */
    
//}); 