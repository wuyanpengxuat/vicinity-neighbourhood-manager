'use strict';
angular.module('VicinityManagerApp.controllers')
.controller('deviceProfileController',
function ($scope, $window, $stateParams, $location, userAccountAPIService, itemsAPIService, AuthenticationService, Notification) {

  $scope.locationPrefix = $location.path();
  console.log("location:" + $location.path());

// Initialize variables and data =====================

  $scope.devEnabled = false;
  $scope.showInput = false;
  $scope.isMyDevice = false;
  $scope.loaded = false;

  $scope.device = {};
  $scope.devInfo = {};
  $scope.AL = 0;

  initData();

  function initData(){
    itemsAPIService.getItemWithAdd($stateParams.deviceId)
      .then(
        function successCallback(response){
          updateScopeAttributes(response);
          $scope.loaded = true;
        },
        function errorCallback(response){
        }
      );
    }

    function updateScopeAttributes(response){
        $scope.device = response.data.message;
        $scope.devInfo = response.data.message.info;
        $scope.owner = response.data.message.hasAdministrator[0].organisation;
        $scope.owner_id = response.data.message.hasAdministrator[0]._id;
        $scope.AL = response.data.message.accessLevel;
        $scope.devEnabled = ($scope.device.status === 'enabled');

        var aux = ["Private", "Metadata access", "Shared with partners", "Public"];
        $scope.ALcaption = aux[$scope.AL - 1];

        $scope.isMyDevice = ($window.sessionStorage.companyAccountId.toString() === $scope.owner_id.toString());
    }

    $scope.changeStatus = function(){
      var query = {};
      if($scope.device.status === 'enabled'){
        query = {
          "public":$scope.AL===4,
          "modifyCommServer":true,
          "status":'disabled',
          "name":$scope.device.name,
          "cid": $scope.owner_id,
          // "agent_id": .... ,
          "password":"test"
        };
      }else{
        query = {
          "public":$scope.AL===4,
          "modifyCommServer":true,
          "status":'enabled',
          "name":$scope.device.name,
          "cid": $scope.owner_id,
          // "agent_id": .... ,
          "password":"test"
        };
      }
      itemsAPIService.putOne($stateParams.deviceId, query)
        .then(
          function successCallback(){
            Notification.success('Device status updated!!');
            initData();
          }
        );
    };

  //  TODO delete when obsolete from controller and view

  //   $scope.makeItem = function(){
  //     var thingDescr =
  //     [
  //       {
  //         "actions": [
  //           {
  //             "affects": "OnOff",
  //             "aid": "status",
  //             "input": {
  //               "datatype": "",
  //               "units": "Adimensional"
  //             },
  //             "read_links": [
  //               {
  //                 "href": "/objects/edcb20b9-c5ad-4283-bc66-c40032498fab/properties/status",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "write_links": [
  //               {
  //                 "href": "/objects/{oid}/actions/UCtrlOnOff",
  //                 "mediaType": "application/json"
  //               }
  //             ]
  //           }
  //         ],
  //         "oid": "12345",
  //         "owner": $scope.owner_id,
  //         "properties": [
  //           {
  //             "monitors": "MeanPowerConsumption",
  //             "output": {
  //               "datatype": "",
  //               "units": "W"
  //             },
  //             "pid": "consumption",
  //             "read_links": [
  //               {
  //                 "href": "/objects/edcb20b9-c5ad-4283-bc66-c40032498fab/properties/consumption",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "writable": false,
  //             "write_links": []
  //           }
  //         ],
  //         "type": "PowerMeter"
  //       },
  //       {
  //         "actions": [
  //           {
  //             "affects": "OnOff",
  //             "aid": "status",
  //             "input": {
  //               "datatype": "",
  //               "units": "Adimensional"
  //             },
  //             "read_links": [
  //               {
  //                 "href": "/objects/4971fc10-bf07-43b1-8311-d0bbdf5ca0d4/properties/status",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "write_links": [
  //               {
  //                 "href": "/objects/{oid}/actions/UCtrlOnOff",
  //                 "mediaType": "application/json"
  //               }
  //             ]
  //           }
  //         ],
  //         "oid": "23456",
  //         "owner": $scope.owner_id,
  //         "properties": [
  //           {
  //             "monitors": "MeanPowerConsumption",
  //             "output": {
  //               "datatype": "",
  //               "units": "W"
  //             },
  //             "pid": "consumption",
  //             "read_links": [
  //               {
  //                 "href": "/objects/4971fc10-bf07-43b1-8311-d0bbdf5ca0d4/properties/consumption",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "writable": false,
  //             "write_links": []
  //           }
  //         ],
  //         "type": "PowerMeter"
  //       },
  //       {
  //         "actions": [],
  //         "oid": "34567",
  //         "owner": $scope.owner_id,
  //         "properties": [
  //           {
  //             "monitors": "RelativeHumidity",
  //             "output": {
  //               "datatype": "",
  //               "units": "%"
  //             },
  //             "pid": "humidity",
  //             "read_links": [
  //               {
  //                 "href": "/objects/d6e5acc3-dc29-417f-aa10-ebad34bf9db3/properties/humidity",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "writable": false,
  //             "write_links": []
  //           },
  //           {
  //             "monitors": "AmbientTemperature",
  //             "output": {
  //               "datatype": "",
  //               "units": "Î’Â°C"
  //             },
  //             "pid": "temperature",
  //             "read_links": [
  //               {
  //                 "href": "/objects/d6e5acc3-dc29-417f-aa10-ebad34bf9db3/properties/temperature",
  //                 "mediaType": "application/json"
  //               }
  //             ],
  //             "writable": false,
  //             "write_links": []
  //           }
  //         ],
  //         "type": "Thermometer"
  //       }
  //       ];
  //
  //       var credentials = [
  //         {
  //           oid:"12345",
  //           credentials:{
  //             name:"object1",
  //             password:"1111"
  //           }
  //         },
  //         {
  //           oid:"34567",
  //           credentials:{
  //             name:"object3",
  //             password:"1111"
  //           }
  //         },
  //         {
  //           oid:"23456",
  //           credentials:{
  //             name:"object2",
  //             password:"1111"
  //           }
  //         }
  //       ];
  //
  //     var query = {
  //         aid: "595ca32220469e0306d59db9", // test with unikl agent
  //         creds: credentials,
  //         thingDescriptions: thingDescr
  //     };
  //
  //     itemsAPIService.postBulk(query)
  //       .then(
  //         function successCallback(response){
  //           $window.alert('done');
  //         }
  //       );
  // };

// HIDE && SHOW DOM =========================

  //Access Level
  $('a#accessEdit').show();
  $('a#accessSave').hide();
  $('a#accessCancel').hide();
  $('select#editAccessName').hide();
  $('p#accessName').show();

  $scope.changeToInput = function () {
    $('a#accessEdit').hide();
    $('p#accessName').hide();
    $('select#editAccessName').show();
    $('a#accessSave').fadeIn('slow');
    $('a#accessCancel').fadeIn('slow');
  };

  $scope.backToEdit = function () {
    $('a#accessCancel').fadeOut('slow');
    $('a#accessSave').fadeOut('slow');
    $('select#editAccessName').fadeOut('slow');
    setTimeout(function() {
      $('a#accessEdit').fadeIn('fast');
      $('p#accessName').fadeIn('fast');
    }, 600);
  };

  $scope.saveNewAccess = function () {
    if ($('select#editAccessName').val() !== 0){
        itemsAPIService.putOne($stateParams.deviceId, {accessLevel: $('select#editAccessName').val() })
          .then(
            function successCallback(){  //!!!!!!!!!! zmenit accessLevel na nove cislo, dorobit!!!
              initData();
              $scope.backToEdit();
            }
          );
        }
      };

  // Serial Number
  $('a#serialEdit').show();
  $('a#serialSave').hide();
  $('a#serialCancel').hide();
  $('input#editSerialInput').hide();
  $('p#serialName').show();

  $scope.changeToInput1 = function () {
    $('a#serialEdit').hide();
    $('p#serialName').hide();
    $('input#editSerialInput').show();
    $('a#serialSave').fadeIn('slow');
    $('a#serialCancel').fadeIn('slow');
  };

  $scope.backToEdit1 = function () {
    $('a#serialCancel').fadeOut('slow');
    $('a#serialSave').fadeOut('slow');
    $('input#editSerialInput').fadeOut('slow');
    setTimeout(function() {
      $('a#serialEdit').fadeIn('fast');
      $('p#serialName').fadeIn('fast');
    }, 600);
  };

  $scope.saveNewSerial = function () {
    if ($('input#editSerialInput').val() !== 0){
        itemsAPIService.putOne($stateParams.deviceId, {"info.serial_number": $scope.devInfo.serial_number})
          .then(
            function successCallback(){  //!!!!!!!!!! zmenit accessLevel na nove cislo, dorobit!!!
              initData();
              $scope.backToEdit1();
            }
          );
        }
      };

  // Location
  $('a#locationEdit').show();
  $('a#locationSave').hide();
  $('a#locationCancel').hide();
  $('input#editLocationInput').hide();
  $('p#locationName').show();

  $scope.changeToInput2 = function () {
    $('a#locationEdit').hide();
    $('p#locationName').hide();
    $('input#editLocationInput').show();
    $('a#locationSave').fadeIn('slow');
    $('a#locationCancel').fadeIn('slow');
  };

  $scope.backToEdit2 = function () {
    $('a#locationCancel').fadeOut('slow');
    $('a#locationSave').fadeOut('slow');
    $('input#editLocationInput').fadeOut('slow');
    setTimeout(function() {
      $('a#locationEdit').fadeIn('fast');
      $('p#locationName').fadeIn('fast');
    }, 600);
  };

  $scope.saveNewLocation = function () {
    if ($('input#editLocationInput').val() !== 0){
        itemsAPIService.putOne($stateParams.deviceId, {"info.location": $scope.devInfo.location})
          .then(
            function successCallback(){  //!!!!!!!!!! zmenit accessLevel na nove cislo, dorobit!!!
              initData();
              $scope.backToEdit2();
            }
          );
        }
      };

// Load picture mgmt =============================

var base64String= "";

$("input#input1").on('change',function(evt) {

  var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

  if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            // $("img#pic").src = fr.result;
            $("img#pic").prop("src",fr.result);
            base64String = fr.result;
        };
        fr.readAsDataURL(files[0]);
    }else{
        // fallback -- perhaps submit the input to an iframe and temporarily store
        // them on the server until the user's session ends.
    }
});

$scope.showLoadPic = function(){
  $scope.showInput = true;
};

$scope.cancelLoadPic = function(){
  $scope.showInput = false;
  $('img#pic').fadeOut('slow');
  setTimeout(function() {
    $("img#pic").prop("src",$scope.device.avatar);
    $('img#pic').fadeIn('slow');
 }, 600);
};

$scope.uploadPic = function(){
  itemsAPIService.putOne($stateParams.deviceId, {avatar: base64String}).success(function (){
    itemsAPIService.getItemWithAdd($stateParams.deviceId).success(function (response) {
      $scope.device = response.data.message;
      $('img#pic').fadeOut('slow');
      setTimeout(function() {
        $("img#pic").prop("src",$scope.device.avatar);
        $('img#pic').fadeIn('slow');
     }, 600);
    });
  });
};

});
