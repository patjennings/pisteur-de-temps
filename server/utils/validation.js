var crypto = require("crypto");


var generateSalt = function()
{
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
	var p = Math.floor(Math.random() * set.length);
	salt += set[p];
    }
    return salt;
}

var sha = function(str) {
    return crypto.createHash('sha1').update(str).digest('base64');
}

var saltAndHash = function(pass, callback)
{
    var salt = generateSalt();
    callback(salt + sha(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
    // on checke plainPass pour savoir s'il correspond à hashedPass
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + sha(plainPass + salt);
    
    console.log(plainPass+" > "+validHash+" ? "+hashedPass);

    callback(null, hashedPass === validHash);
}

module.exports = {
    saltAndHash: saltAndHash,
    validatePassword: validatePassword
}
