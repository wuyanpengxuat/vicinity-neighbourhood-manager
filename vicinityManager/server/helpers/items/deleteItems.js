
// Global Objects

var mongoose = require('mongoose');
var itemOp = require('../../models/vicinityManager').item;
var nodeOp = require('../../models/vicinityManager').node;
var logger = require('../../middlewares/logger');
var commServer = require('../../helpers/commServer/request');

// Public functions

/*
Deletes either a selection of oids or all oids under a node
*/
function deleteItems(oids, res){
  var flag = 0;
  if(oids.length > 0){ // Check if there is any item to delete
    flag = deleting(oids, flag);
  }
  if(flag === 1){
    res.json({"error": true, "message": "Something went wrong..."});
  } else {
    res.json({"error": false, "message": "Success!"});
  }
}

// Private functions

/*
Delete == Remove relevant fields and change status to removed
Make sure that agent is deleted or break connection with removed object
*/
function deleting(oids, flag){
  var obj = {
    info: {},
    oid: "",
    avatar: "",
    accessLevel: 0,
    hasAdministrator: [],
    status: 'deleted'
  };
  itemOp.findOneAndUpdate({oid:oids[0]}, { $set: obj }, {new: true},
    function(err,data){
      if( err || !data ){
        logger.debug("Something went wrong: " + err);
        flag = 1;
      } else {
        nodeOp.update({adid: data.adid}, {$pull: {hasItems: oids[0]}}, function(err,agent){
          if(err){
            logger.debug("Something went wrong: " + err);
            flag = 1;
          } else {
            commServer.callCommServer({}, 'users/' + oids[0], 'DELETE')
              .catch(errorCallback);
            oids.splice(0,1);
            if(oids.length > 0){
              deleting(oids, flag);
            }
          }
        });
      }
    });
    return flag;
  }

// Private Functions

function errorCallback(err){
  logger.debug('Error deleting item in commServer: ' + err);
}

// Export modules

module.exports.deleteItems = deleteItems;