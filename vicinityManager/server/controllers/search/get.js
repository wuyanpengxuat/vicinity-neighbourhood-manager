// Global objects and variables

var mongoose = require('mongoose');
var logger = require("../../middlewares/logger");
var sGet = require("../../services/search/get");

// Public functions

  /*
  Looks for a substring match whithin the userAccount collection
  Organisation is used as a index and it is the field we compare
  Text index are not used because do not support substring look up!
  */
  function searchOrganisation(req, res, next) {
    var searchTerm = req.query.searchTerm;
    var sT = new RegExp(searchTerm, 'i');
    var cid =  mongoose.Types.ObjectId(req.body.decoded_token.orgid);
    var api = false; // Call origin api or webApp
    sGet.searchOrganisation(sT, cid,  api, function(err, response){
      res.json({error: err, message: response});
    });
  }

  /*
  Looks for a substring match whithin the user collection
  Name is used as a index and it is the field we compare
  Text index are not used because do not support substring look up!
  */
  function searchUser(req, res, next) {
    var searchTerm = req.query.searchTerm;
    var cid =  mongoose.Types.ObjectId(req.body.decoded_token.orgid);
    var sT = new RegExp(searchTerm, 'i');
    var api = false; // Call origin api or webApp
    sGet.searchUser(sT, cid, api, function(err, response){
      res.json({error: err, message: response});
    });
  }

  /*
  Looks for a substring match whithin the item collection
  Name is used as a index and it is the field we compare
  Access level restrictions apply!
  Text index are not used because do not support substring look up!
  */
  function searchItem(req, res, next) {
    var searchTerm = req.query.searchTerm;
    // var otherCids = req.body;
    var cid = mongoose.Types.ObjectId(req.body.decoded_token.orgid);
    var sT = new RegExp(searchTerm, 'i');
    var api = false; // Call origin api or webApp
    sGet.searchItem(sT, cid, api, function(err, response){
      res.json({error: err, message: response});
    });
  }

// Export modules

  module.exports.searchOrganisation = searchOrganisation;
  module.exports.searchUser = searchUser;
  module.exports.searchItem = searchItem;
