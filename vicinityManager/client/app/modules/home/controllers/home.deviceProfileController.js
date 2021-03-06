'use strict';
angular.module('VicinityManagerApp.controllers')
.controller('deviceProfileController',
function ($scope, $window, $state, commonHelpers, tokenDecoder, $stateParams, $location, itemsAPIService, Notification) {

  $scope.locationPrefix = $location.path();

// Initialize variables and data =====================

  commonHelpers.triggerResize(); // Triggers window resize to avoid bug

  $scope.itemEnabled = false;
  $scope.showInput = false;
  $scope.isMyItem = false;
  $scope.isMyOrgItem = false;
  $scope.imDeviceOwner = false;
  $scope.imAdmin = false;
  $scope.loaded = false;
  $scope.item = {};
  $scope.owner = "";
  $scope.gateway = {};
  $scope.accessLevelNew = 0;

  // initialize DOM
  $('div#moveEdit').show();
  $('a#moveSave').hide();
  $('a#moveCancel').hide();
  $('select#editMoveName').hide();

/* INITIALIZATION */

  initData();

  function initData(){
    itemsAPIService.getItemWithAdd($stateParams.deviceId)
      .then(function(response){
        $scope.isMyItem = false;
        $scope.isMyOrgItem = false;
        $scope.loaded = false;
        try{
          updateScopeAttributes(response);
          $scope.loaded = true;
          getToken();
        } catch(err) {
          console.log(err);
          Notification.error("Problem initializing data");
        }
      })
      .catch(function(err){
        if(err.status === 404){
          console.log(err);
          Notification.error("Device not found");
          $state.go("root.main.allDevices");
        } else {
          console.log(err);
          Notification.error("Server error");
        }
      });
    }

    function getToken(){
      var payload = tokenDecoder.deToken();
      for(var i in payload.roles){
        if(payload.roles[i] === 'device owner'){
          $scope.imDeviceOwner = true;
        }
        if(payload.roles[i] === 'administrator'){
          $scope.imAdmin = true;
        }
      }
    }

    function updateScopeAttributes(response){
        $scope.item = response.data.message[0];
        $scope.name = $scope.item.cid.id.name;
        $scope.item.uid = $scope.item.uid === undefined ? {} : $scope.item.uid; // Case device disabled
        $scope.owner = $scope.item.uid.extid;
        $scope.itemEnabled = ($scope.item.status === 'enabled');
        $scope.gateway = {
          id: $scope.item.adid.id,
          adid: $scope.item.adid.extid,
          name: $scope.item.adid.name,
          type: $scope.item.adid.type,
          logo: $scope.item.adid.type === "shq" ? "img/logos/shqlogo.png" : "img/logos/vcntlogo.png"
        };

        var aux = ["Private", "Partners with Data Under Request", "Public with Data Under Request"];
        $scope.ALcaption = aux[$scope.item.accessLevel];

        if($scope.itemEnabled) $scope.isMyItem = ($window.sessionStorage.userAccountId.toString() === $scope.item.uid.id.toString());
        $scope.isMyOrgItem = ($window.sessionStorage.companyAccountId.toString() === $scope.item.cid.id._id.toString());
    }

/* MAIN FUNCTIONS */

  $scope.changeStatus = function(){
    var query = {};
    if($scope.item.status === 'enabled'){
      query = {
        "status":'disabled',
        "o_id": $scope.item._id,
        "oid": $scope.item.oid,
        "typeOfItem": "device"
      };
    }else{
      query = {
        "status":'enabled',
        "o_id": $scope.item._id,
        "oid": $scope.item.oid,
        "typeOfItem": "device"
      };
    }
    itemsAPIService.putOne(query)
    .then(
      function(response){
        if(response.data.success){
          Notification.success('Device status updated!!');
          initData();
        } else {
          Notification.warning('Unauthorized');
        }
      })
      .catch(function(err){
        console.log(err);
        Notification.error("Error changing status");
      });
    };

  $scope.deleteItem = function(){
    if(confirm('Are you sure?')){
      itemsAPIService.deleteItem($scope.item.oid)
      .then(function(response){
        if(response.data.error){
          console.log(response.data.message);
          Notification.warning('Problem deleting device');
          $state.go("root.main.home");
        } else {
          Notification.success('Device deleted');
          $state.go("root.main.home");
        }
      })
      .catch(function(err){
        console.log(err);
        Notification.error("Error deleting device");
      });
    }
  };

// HIDE && SHOW DOM =========================

  //Access Level

  $scope.saveNewAccess = function () {
    if (Number($scope.accessLevelNew) !== 0){
        itemsAPIService.putOne(
          {accessLevel: Number($scope.accessLevelNew) - 1,
          typeOfItem: "device",
          o_id: $scope.item._id,
          oid: $scope.item.oid,
          uid: $scope.owner,
          oldAccessLevel: $scope.item.accessLevel })
          .then(
            function successCallback(response){
              if(response.data.success){
                Notification.success("Access level updated");
              } else {
                Notification.warning("User is unauthorized or access level too low...");
              }
              initData();
            }
          )
          .catch(function(err){
            console.log(err);
            Notification.error("Error saving new access level");
          });
        }
      };


  // Move / Change item owner/gateway

  $scope.changeToInputMove = function () {
    $('div#moveEdit').hide();
    $('select#editMoveName').fadeIn('slow');
    $('a#moveSave').fadeIn('slow');
    $('a#moveCancel').fadeIn('slow');
  };

  $scope.backToEditMove = function () {
    $('a#moveCancel').fadeOut('slow');
    $('a#moveSave').fadeOut('slow');
    $('select#editMoveName').fadeOut('slow');
    setTimeout(function() {
      $('div#moveEdit').fadeIn('fast');
    }, 600);
  };

  $scope.saveNewAccessMove = function(){
    var newThing = JSON.parse($('select#editMoveName').val());
    var item = {
      id: $scope.item._id,
      extid: $scope.item.oid,
      name: $scope.item.name
    };
    if(newThing.hasOwnProperty("adid")){
      var adid = {
        id: newThing._id,
        extid: newThing.adid,
        name: newThing.name,
        type: $scope.gateway.type
      };
      itemsAPIService.changeGateway({oid: item, adid: adid})
      .then(function(response){
        Notification.success('Gateway changed successfuly');
        initData();
        $scope.backToEditMove();
      })
      .catch(function(error){
        console.log(error);
        Notification.error('Error changing gateway');
        $scope.backToEditMove();
      });
    } else {
      var uidNew = {
        id: newThing._id,
        extid: newThing.email,
        name: newThing.name
      };
      var uidOld = {
        id: $scope.item.uid.id,
        extid: $scope.item.uid.extid,
        name: $scope.item.uid.name
      };
      itemsAPIService.moveItem({oid: item, uidNew: uidNew, uidOld: uidOld})
      .then(function(response){
        Notification.success('Owner changed successfuly');
        initData();
        $scope.backToEditMove();
      })
      .catch(function(error){
        console.log(error);
        Notification.error('Error changing owner');
        $scope.backToEditMove();
      });
    }
  };

  $scope.changeOwner = function(){
    $scope.moveThings = [];
    itemsAPIService.getMoveUsers('device')
    .then(function(response){
      if(response.data.message.length > 0){
        $scope.moveThings = response.data.message;
        $scope.changeToInputMove();
        removeCurrent($scope.item.uid.id);
      } else {
        Notification.warning("There aren't available users...");
      }
    })
    .catch(function(error){
      console.log(error);
      Notification.error("Error changing owner");
    });
  };

  $scope.changeGateway = function(){
    $scope.moveThings = [];
    itemsAPIService.getMoveGateways($scope.gateway.type)
    .then(function(response){
      if(response.data.message.length > 0){
        $scope.moveThings = response.data.message;
        $scope.changeToInputMove();
        removeCurrent($scope.gateway.id);
      } else {
        Notification.warning("There aren't available gateways...");
      }
    })
    .catch(function(error){
      console.log(error);
      Notification.error('Error changing gateway');
    });
  };

  function removeCurrent(id){
      for(var i = 0, l = $scope.moveThings.length; i < l; i++){
          if($scope.moveThings[i]._id.toString() === id.toString()){
            $scope.moveThings.splice(i,1);
            return true;
          }
      }
  }

  // Location

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
  $('#editCancel1').fadeIn('slow');
  $('#editUpload2').fadeIn('slow');
  $('#input1').fadeIn('slow');
};

$scope.cancelLoadPic = function(){
  $('#editCancel1').fadeOut('slow');
  $('#editUpload2').fadeOut('slow');
  $('#input1').fadeOut('slow');
  $('img#pic').fadeOut('slow');
  setTimeout(function() {
    $("img#pic").prop("src",$scope.item.avatar);
    $('img#pic').fadeIn('slow');
 }, 600);
};

$scope.uploadPic = function(){
  itemsAPIService.putOne({avatar: base64String, o_id: $stateParams.deviceId, typeOfItem: "device", oid: $scope.item.oid})
    .then(
      function successCallback(response){
        itemsAPIService.getItemWithAdd($stateParams.deviceId)
          .then(
            function successCallback(response) {
              if(response.data.success){
                  Notification.success("Access level updated");
                $scope.item = response.data.message;
                $('#editCancel1').fadeOut('slow');
                $('#editUpload2').fadeOut('slow');
                $('#input1').fadeOut('slow');
                $('img#pic').fadeOut('slow');
                setTimeout(function() {
                  $("img#pic").prop("src",$scope.item.avatar);
                  $('img#pic').fadeIn('slow');
               }, 600);
             } else {
               Notification.warning('Unauthorized');
             }
           },
           function errorCallback(err){
             console.log(err);
             Notification.error("Error uploading picture");
           }
         );
      }
    );
  };
});
