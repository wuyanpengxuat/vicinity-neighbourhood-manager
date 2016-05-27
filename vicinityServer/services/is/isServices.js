module.exports.getData = getData;
module.exports.writeCommand = writeCommand;

var winston = require('winston');
var request = require('request');
var async = require('async');

winston.level = 'debug';


function getData(gatewayObjects, callback){
  winston.log('debug', 'Start: Reading data from IS infrastructure');
  winston.log('debug', 'GatewayObjects being processed: ' + gatewayObjects.length);
  async.forEachSeries(gatewayObjects, function(gatewayObject, device_callback){

    if (gatewayObject.type == "IS") {
      winston.log('debug','Processing device: ' + gatewayObject.device_id.toString());

      var options = { method: 'GET',
        url: 'http://localhost:9002/service/devices/' + gatewayObject.info.id_value,
        headers:
         { 'postman-token': 'b4c869b2-4838-7524-4156-b72e5bbd4b9b',
           'cache-control': 'no-cache' } };

      request(options, function (error, response, body) {
        if (error) {
          winston.log('error', error.message);
          device_callback();
        } else {
          winston.log('debug', body);

          var data = JSON.parse(body);

          winston.log('debug', data);


          for (var j in gatewayObject.data_sources){
            winston.log('debug','Processing data source: ' + gatewayObject.data_sources[j].name);
            if (gatewayObject.data_sources[j].name === "Power consumption"){
                gatewayObject.data_sources[j].data =
                  { timestamp : data['last-seen'].timestamp,
                    value: data['last-seen'].value};

                winston.log('debug','Timestamp: %s Value: %s',
                  gatewayObject.data_sources[j].data.timestamp,
                  gatewayObject.data_sources[j].data.value);
            } /* else if (gatewayObject.data_sources[j].name === "Switch status") {
              gatewayObject.data_sources[j].data =
                { timestamp : data['last-seen'].timestamp,
                  value: (data['last-seen'].value == "0") ? "Off" : "On"};
            } */

          }
            device_callback();
        }

      });
    } else {
      device_callback();
    }
  }, function(err){
    if (err){
      winston.log('error', err.message);
    }
    callback();
  });

  winston.log('debug', 'End: Reading data from CERTH infrastructure');
}

function writeCommand(device){
  winston.log('debug', 'Start: Write command in device' + device.info.id_value);

  debugger;

  async.forEachSeries(device.data_sources, function(dataSource, callback){
    if (dataSource.controllable == 'true') {
      debugger;
      var options = { method: 'POST',
      url: 'http://localhost:9002/service/devices',
      headers:
       { 'content-type': 'application/x-www-form-urlencoded',
         'postman-token': '05d20659-11d8-bc8f-245a-6e8cd2285b99',
         'cache-control': 'no-cache' },
      form: { mac: device.info.id_value, command: dataSource.value } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        winston.log('debug', body);
        callback();
      });
    } else {
      callback();
    }


  }, function(err){

  });


  winston.log('debug', 'End: Write command in device');
}