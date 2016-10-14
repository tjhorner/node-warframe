var Warframe = require('../index'),
    warframe = new Warframe({ storeAccount: true });

var config = require('./test_config.json'),
    colors = require('colors');

warframe.login(config.login.username, config.login.password, function(res){
  console.log("Welcome,", warframe.currentAccount.DisplayName.cyan);
    console.log("Auth nonce:", warframe.currentAccount.Nonce)

  warframe.pendingRecipes(function(inv){
    console.log("You have", inv.PendingRecipes, "pending recipes.\n");
  });

  warframe.friends(function(friends){
    console.log("Your friends:");
    friends.Current.forEach(function(friend){
      console.log(friend.DisplayName.yellow, "[Level " + friend.PlayerLevel + "]");
    });
  });
});
