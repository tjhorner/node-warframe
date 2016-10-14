var request = require('request'),
    whirlpool = require('./lib/whirlpool'),
    querystring = require('querystring');

function Warframe(params){

  var API_BASE = "https://api.warframe.com/api/";
  var STATS_BASE = "https://api.warframe.com/stats/";
    
  if(params && params.storeAccount) storeAccount = true;

  this.currentAccount = {
    DisplayName: "",
    SteamId: "",
    CountryCode: "",
    Nonce: 0,
    BuildLabel: "",
    NRS: [ ],
    IRC: [ ],
    uid: "",
    id: "" // WHY IS THIS LOWERCASE AND EVERYTHING IS NOT FUCK
  };

  this._get = function(endpoint, query, callback){
    var _this = this;

    // authenticate requests by default
    if(_this.currentAccount){
      query.accountId = _this.currentAccount.id;
      query.nonce = _this.currentAccount.Nonce;
    }

    request.get(API_BASE + endpoint + ".php", {
      qs: query
    }, function(err, res, body){
      if(err) throw(err);

      try{
        callback(JSON.parse(body));
      }catch(e){
        callback(body);
      }
    });
  };
    
  this._get2 = function(endpoint, query, callback){
    var _this = this;

    // authenticate requests by default
    if(_this.currentAccount){
      query.accountId = _this.currentAccount.id;
      query.nonce = _this.currentAccount.Nonce;
    }

    request.get(STATS_BASE + endpoint + ".php", {
      qs: query
    }, function(err, res, body){
      if(err) throw(err);

      try{
        callback(JSON.parse(body));
      }catch(e){
        callback(body);
      }
    });
  };

  this._post = function(endpoint, body, qs, callback){
    var _this = this;

    // authenticate requests by default
    if(_this.currentAccount){
      body.accountId = _this.currentAccount.id;
      body.nonce = _this.currentAccount.Nonce;
    }

    if(qs){
      body = querystring.stringify(body);
    }else{
      body = JSON.stringify(body);
    }

    request.post(API_BASE + endpoint + ".php", {
      body: body,
      headers: {
        "X-Titanium-Id": "9bbd1ddd-f7f2-402d-9777-873f458cb50c",
        "User-Agent": "",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded" // the mobile client sends this for every fucking content-type, no matter what it is. don't ask me why
      }
    }, function(err, res, body){
      if(err) throw(err);

      try{
        callback(JSON.parse(body));
      }catch(e){
        callback(body);
      }
    });
  };

  this.login = function(email, password, callback){
    var _this = this;

    _this._post("login", {
      email: email,
      password: whirlpool(password).toLowerCase(), // warframe hashes password as whirlpool, this took me a long time to figure out fuck
      date: new Date().getTime() * 1000,
      time: Math.floor(new Date().getTime() / 1000),
      kick: 1
    }, false, function(body){
      if(body.Nonce && storeAccount) _this.currentAccount = body;
      callback(body);
    });
  };

  this.inventory = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._post("inventory", { accountId: id, nonce: nonce }, true, callback);
  };

  this.pendingRecipes = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get("checkPendingRecipes", { accountId: id, nonce: nonce }, callback);
  };

  this.friends = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get("getFriends", { accountId: id, nonce: nonce }, callback);
  };

  this.credits = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get("credits", { accountId: id, nonce: nonce }, callback);
  };
    
  this.loginReward = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get("loginRewards", { accountId: id, nonce: nonce }, callback);
  };
    
  this.getGuild = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get("getGuild", { accountId: id, nonce: nonce }, callback);
  };
    
  this.viewPlayer = function(id, nonce, uid, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
      uid = _this.currentAccount.uid;
    }

    _this._get2("view", { accountId: id, nonce: nonce, id: uid }, callback);
  };
    
  this.viewSelf = function(id, nonce, callback){
    var _this = this;

    if(typeof(id) === "function"){
      callback = id;
      id = _this.currentAccount.id;
      nonce = _this.currentAccount.Nonce;
    }

    _this._get2("view", { accountId: id, nonce: nonce, id: id }, callback);
  };

  return this;
}

module.exports = Warframe;