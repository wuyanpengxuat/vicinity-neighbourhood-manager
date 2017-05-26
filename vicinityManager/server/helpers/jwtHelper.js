var jwt = require('jwt-simple');
var config = require('../configuration/configuration');
var moment = require('moment');

module.exports.jwtEncode = function(username, roles, userAccountId, companyAccountId){

    var key = config.jwtTokenSecret;
    var expires = moment().add(7, 'days').valueOf();
    var token = jwt.encode({
        iss: 'vicinityManager',
        sub: username,
        exp: expires,
        roles: roles,
        context: {name: username, uid: userAccountId, cid: companyAccountId}
    }, config.jwtTokenSecret);
    var response ={
      token: token,
      expires: expires,
      username: username,
      userAccountId: userAccountId,
      companyAccountId: companyAccountId};
    return response;
  };

module.exports.jwtDecode = function(token) {
  try {
    return jwt.decode(token, config.jwtTokenSecret);
  } catch (err) {
    return "inValid";
  }
};
