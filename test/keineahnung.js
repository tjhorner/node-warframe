var Warframe = require("../index"),
    warframe = new Warframe({ storeAccount: true });
var config = require("./test_config.json"),
    colors = require("colors");
var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){
        
        warframe.login(config.login.username, config.login.password, function(response){  
    
            console.log("Auth nonce:", warframe.currentAccount.Nonce);
            res.render("index", { "username": "mhn23", "id": warframe.currentAccount.Nonce } );
            
        });
        
    });

    app.use(function(req, res){
        res.sendStatus(404);
    });
    
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

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