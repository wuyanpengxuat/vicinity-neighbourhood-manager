angular.module('VicinityManagerApp.controllers')
.controller('cPuserAccountsController',
function ($scope, $window, $stateParams, $location, userAccountAPIService, itemsAPIService, AuthenticationService, Notification) {

  // $scope.locationPrefix = $location.path();
  // console.log("location:" + $location.path());
  // $scope.name = {};
  // $scope.avatar = {};
  // $scope.occupation = {};
  // $scope.organisation = {};
  // $scope.companyAccountId = {};
  // $scope.isMyProfile = true;
  // $scope.canSendNeighbourRequest = false;
  // $scope.canCancelNeighbourRequest = false;
  // $scope.canAnswerNeighbourRequest = false;
  // $scope.isNeighbour = false;
  // $scope.location = {};
  // $scope.badges = {};
  // $scope.notes = {};
  // $scope.friends = [];
  // $scope.following = [];
  // $scope.followers = [];
  // $scope.gateways = [];

  $scope.userAccounts=[];
  $scope.companyId = $stateParams.companyAccountId;
  $scope.loaded = false;

  userAccountAPIService.getUserAccountProfile($stateParams.companyAccountId)
    .then(
      function successCallback(response){
        $scope.userAccounts = response.data.message.accountOf;
        $scope.loaded = true;
      },
      function errorCallback(response){}
    );

});
