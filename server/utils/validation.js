var crypto =       require("crypto");
var models =       require("../models/mongo"); // le modèle mongodb


const guid = function(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}

var generateLoginKey = function(userId, ipAddress)
{ 
    let cookie = guid();
    return cookie;
}

var validateLoginKey = function(cookie, ipAddress, callback)
{
    // ensure the cookie maps to the user's last recorded ip address //
    models.users.findOne({cookie:cookie, ip:ipAddress}, (e, o) => {
	return o;
    });
}

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
    
    // console.log(plainPass+" > "+validHash+" ? "+hashedPass);
    callback(null, hashedPass === validHash);
}

module.exports = {
    validateLoginKey: validateLoginKey,
    generateLoginKey: generateLoginKey,
    saltAndHash: saltAndHash,
    validatePassword: validatePassword
}
