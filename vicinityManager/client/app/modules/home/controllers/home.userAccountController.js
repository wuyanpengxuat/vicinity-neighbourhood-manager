angular.module('VicinityManagerApp.controllers').
controller('userAccountController', function($scope, $window, userAccountAPIService, AuthenticationService) {
  $scope.name = {};
  $scope.avatar = {};
  $scope.occupation = {};
  $scope.organisation = {};
  $scope.userAccountId = {};
  $scope.companyAccountId = {};
  $scope.loaded = false;

  $scope.signout = function(){
    console.log("Begin: Signout");
    AuthenticationService.signout("/login");
    console.log("End: Signout");
  }

  userAccountAPIService.getUserAccountProfile($window.sessionStorage.companyAccountId).then(
    function successCallback(response){

    i=0;
    j=0;
    while (i==0){
      if (response.data.message.accountOf[j].email==$window.sessionStorage.username){
        $scope.name =response.data.message.accountOf[j].name;
        $scope.occupation=response.data.message.accountOf[j].occupation;
        $scope.avatar =response.data.message.accountOf[j].avatar;
        $scope.userAccountId = $window.sessionStorage.userAccountId;
        i=1;
      };
      j++;
    }

    $scope.organisation = response.data.message.organisation;
    $scope.companyAccountId = response.data.message._id;
    $scope.loaded = true;
  },
  function errorCallback(response){
  }
);


});
