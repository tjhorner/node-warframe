var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json');

warframe.login(config.login.username, config.login.password, function(res){
    
    warframe.loginReward(function(data){
        
        var days = JSON.parse(data);
        var daysleft = days.DailyTributeInfo.NextMilestoneDay - days.DailyTributeInfo.LoginDays;
        console.log("Days:", days.DailyTributeInfo.LoginDays);
        console.log("Next Milestone:", days.DailyTributeInfo.NextMilestoneDay);
        console.log("Days left until next Milestone:", daysleft);
        try {
            console.log("Reward:\n",reward.DailyTributeInfo.Rewards[0].StoreItemType);
        } catch (err) {
            console.log("Reward already received")
        }
    });
    
});