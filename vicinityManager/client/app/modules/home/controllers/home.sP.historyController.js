'use strict';
angular.module('VicinityManagerApp.controllers')
.controller('sPhistoryController',
function ($scope, $window, $stateParams, $location, commonHelpers, userAccountAPIService, itemsAPIService, AuthenticationService, Notification) {

  // ====== Triggers window resize to avoid bug =======
  commonHelpers.triggerResize();

  $scope.userAccounts = [];
  $scope.companyAccounts = [];
  $scope.thisCompany = {};
  $scope.friendsThisCom = [];
  $scope.loaded = false;

  itemsAPIService.getItemWithAdd($stateParams.serviceId)
    .then(
      function successCallback(response){
        $scope.device = response.data.message[0];

        userAccountAPIService.getUserAccountProfile($scope.device.hasAdministrator[0]._id)
          .then(
            function successCallback(response) {
              $scope.userAccounts = response.data.message.accountOf;
              $scope.thisCompany = response.data.message;
            },
            function errorCallback(response){
            }
          );

        userAccountAPIService.getUserAccounts()
          .then(
            function successCallback(response) {
              $scope.companyAccounts = response.data.message;
            },
            function errorCallback(response){
            }
          );

        userAccountAPIService.getFriends($scope.device.hasAdministrator[0]._id)
          .then(
            function successCallback(response){
              $scope.friendsThisCom = response.data.message;
            },
            function errorCallback(response){
            }
          );
        $scope.loaded = true;
        },
        function errorCallback(response){
        }
      );

});