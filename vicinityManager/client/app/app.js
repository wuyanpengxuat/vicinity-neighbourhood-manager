'use strict';

angular.module('constants',[]).constant('configuration', this._env);


angular.module('Authentication', ['ngCookies', 'constants', 'ui-notification','VicinityManagerApp.controllers']);
angular.module('Registration', ['ngCookies', 'constants', 'VicinityManagerApp.controllers']);



// Declare app level module which depends on views, and components
angular.module('VicinityManagerApp', [
//  'ngRoute',
  'ui.router',
  'VicinityManagerApp.controllers',
  'VicinityManagerApp.services',
  'VicinityManagerApp.version',
  'ngCookies',
  'ui-notification',
  'Authentication',
  'Registration',
  'constants',
  'angularFileUpload'
]).
  config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('root', {
          abstract: true,
          templateUrl: 'modules/home/views/home.html'
        })
        .state('root.main', {
          url: '',
          abstract:true,
          views: {
            'messagesMenuView':
              {
                templateUrl: 'modules/home/views/home.messagesMenuView.html'
              },
            'notificationsMenuView':
              {
                templateUrl: 'modules/home/views/home.notificationsMenuView.html',
                controller: 'notifications'
              },
              'searchUp':
                {
                  templateUrl: 'modules/home/views/home.searchUpView.html',
                  controller: 'searchUpController'
                },
            'settingsMenuView':
              {
                templateUrl: 'modules/home/views/home.settingsMenuView.html',
                controller: 'settingsController'
              },
            'userAccountView':
              {
                templateUrl: 'modules/home/views/home.userAccountView.html',
                controller: 'userAccountController'
              },
            'companyAccountView':
              {
                templateUrl: 'modules/home/views/home.companyAccountView.html',
                controller: 'companyAccountController'
              }
          }
        })
        .state('root.main.home', {
          url: '/home',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.allDevicesView.html',
                controller: 'allDevicesController'
              }
          }
        })
        .state('root.main.neighbourhood', {
          url: '/neighbourhood/:searchTerm',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.neighbourhoodView.html',
                controller: 'neighbourhoodController'
              }
          }
        })
        .state('root.main.allDevices', {
          url: '/allDevices/:searchTerm',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.allDevicesView.html',
                controller: 'allDevicesController'
              }
          }
        })
        // .state('root.main.neighbourhoodSearch', {
        //   url: '/neighbourhoodSearch',
        //   views: {
        //     'mainContentView@root':
        //       {
        //         templateUrl: 'modules/home/views/home.neighbourhoodSearchView.html',
        //         controller: 'neighbourhoodSearchController'
        //       }
        //   }
        // })
        .state('root.main.mydevices', {
          url: '/mydevices',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.mydevicesView.html',
                controller: 'myDevicesController'
              }
          }
        })
        .state('root.main.partneredEntities', {
          url: '/partneredEntities',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.partneredEntities.html',
                controller: 'partneredEntities'
              }
          }
        })
        .state('root.main.allEntities', {
          url: '/allEntities',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.allEntities.html',
                controller: 'allEntities'
              }
          }
        })
        .state('root.main.myServices', {
          url: '/myServices',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.myServices.html',
                controller: 'myServices'
              }
          }
        })
        .state('root.main.allServices', {
          url: '/allServices',
          views: {
            'mainContentView@root':
              {
                templateUrl: 'modules/home/views/home.allServices.html',
                controller: 'allServices'
              }
          }
        })
        .state('root.main.searchresults', {
          url: '/search/:searchTerm',
          views: {
            'mainContentView@root':
                {
                  templateUrl: 'modules/home/views/home.searchView.html',
                  controller: 'searchController'
                }
          }
        })
        .state('root.main.serviceProfile1', {
          url: '/serviceProfileEnergy',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.serviceProfileView1.html'
            }
          }
        })

        .state('root.main.serviceProfile1.consumers', {
            url: '/consumers',
            views: {
                'tabPanel@root.main.serviceProfile1':
                    {
                        templateUrl: 'modules/home/views/home.SPView.consumers.html'
                    }
            }
        })

        .state('root.main.serviceProfile1.configuration', {
            url: '/configuration',
            views: {
                'tabPanel@root.main.serviceProfile1':
                    {
                        templateUrl: 'modules/home/views/home.SPView.configuration.html'
                    }
            }
        })

        .state('root.main.serviceProfile2', {
          url: '/serviceProfileHealth',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.serviceProfileView2.html'
            }
          }
        })

        .state('root.main.serviceProfile2.consumers', {
            url: '/consumers',
            views: {
                'tabPanel@root.main.serviceProfile2':
                    {
                        templateUrl: 'modules/home/views/home.SPView.consumers.html'
                    }
            }
        })

        .state('root.main.serviceProfile2.configuration', {
            url: '/configuration',
            views: {
                'tabPanel@root.main.serviceProfile2':
                    {
                        templateUrl: 'modules/home/views/home.SPView.configuration.html'
                    }
            }
        })

        .state('root.main.serviceProfile3', {
          url: '/serviceProfileCars',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.serviceProfileView3.html'
            }
          }
        })

        .state('root.main.serviceProfile3.consumers', {
            url: '/consumers',
            views: {
                'tabPanel@root.main.serviceProfile3':
                    {
                        templateUrl: 'modules/home/views/home.SPView.consumers.html'
                    }
            }
        })

        .state('root.main.serviceProfile3.configuration', {
            url: '/configuration',
            views: {
                'tabPanel@root.main.serviceProfile3':
                    {
                        templateUrl: 'modules/home/views/home.SPView.configuration.html'
                    }
            }
        })

        .state('root.main.companyProfile', {
          url: '/profile/company/:companyAccountId',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.companyProfileView.html',
              controller:  'companyProfileController'
            }
          }
        })


        .state('root.main.companyProfile.devices', {
            url: '/devices',
            views: {
                'tabPanel@root.main.companyProfile':
                    {
                        templateUrl: 'modules/home/views/home.companyProfile.devicesView.html',
                        controller: 'cPdevicesController'
                    }
            }
        })
        .state('root.main.companyProfile.friends', {
            url: '/partners',
            views: {
                'tabPanel@root.main.companyProfile':
                    {
                        templateUrl: 'modules/home/views/home.companyProfile.friendsView.html',
                        controller: 'cPfriendsController'
                    }
            }
        })
        .state('root.main.companyProfile.history', {
            url: '/history',
            views: {
                'tabPanel@root.main.companyProfile':
                    {
                        templateUrl: 'modules/home/views/home.companyProfile.historyView.html',
                        controller: 'cPhistoryController'
                    }
            }
        })

        .state('root.main.deviceProfile', {
          url: '/profile/device/:deviceId',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.deviceProfileView.html',
              controller:  'deviceProfileController'
            }
          }
        })

        .state('root.main.deviceProfile.history', {
          url: '/history',
          views: {
            'tabPanel@root.main.deviceProfile':
            {
              templateUrl: 'modules/home/views/home.deviceProfile.historyView.html',
              controller:  'dPhistoryController'
            }
          }
        })

        .state('root.main.deviceProfile.whoSee', {
          url: '/whoSee',
          views: {
            'tabPanel@root.main.deviceProfile':
            {
              templateUrl: 'modules/home/views/home.deviceProfile.whoSeeView.html',
              controller:  'dPwhoSeeController'
            }
          }
        })


        // .state('root.main.deviceProfile.devices', {
        //     url: '/devices',
        //     views: {
        //         'tabPanel@root.main.deviceProfile':
        //             {
        //                 templateUrl: 'modules/home/views/home.deviceProfile.devicesView.html',
        //                 controller: 'cPdevicesController'
        //             }
        //     }
        // })
        // .state('root.main.deviceProfile.friends', {
        //     url: '/friends',
        //     views: {
        //         'tabPanel@root.main.deviceProfile':
        //             {
        //                 templateUrl: 'modules/home/views/home.deviceProfile.friendsView.html',
        //                 controller: 'cPfriendsController'
        //             }
        //     }
        // })
        // .state('root.main.deviceProfile.history', {
        //     url: '/history',
        //     views: {
        //         'tabPanel@root.main.deviceProfile':
        //             {
        //                 templateUrl: 'modules/home/views/home.deviceProfile.historyView.html',
        //                 controller: 'cPhistoryController'
        //             }
        //     }
        // })


        .state('root.main.companyProfile.userAccounts', {
            url: '/userAccounts',
            views: {
                'tabPanel@root.main.companyProfile':
                    {
                        templateUrl: 'modules/home/views/home.companyProfile.userAccountsView.html',
                        controller: 'cPuserAccountsController'
                    }
            }
        })

        .state('root.main.userProfile', {
          url: '/profile/user/:companyAccountId/:userAccountId',
          views: {
            'mainContentView@root':
            {
              templateUrl: 'modules/home/views/home.userProfileView.html',
              controller:  'userProfileController'
            }
          }
        })

        .state('invitationOfNewUser', {
          url: '/invitation/newUser/:invitationId',
          templateUrl: 'modules/registration/views/invitation.newUser.html',
          controller: 'invitationNewUserController',
          onEnter: function(){
            console.log('Activating state new user');
          }
        })

        // .state('invitation.newUser', {
        //   url: '/invitation/newUser/:invitationId',
        //   views: {
        //     'invitationNewUser':
        //       {
        //         templateUrl: 'modules/registration/views/invitation.newUser.html',
        //         controller: 'invitationNewUserController'
        //       }
        //   }
        // })

        .state('invitationOfNewCompany', {
          url: '/invitation/newCompany/:invitationId',
          templateUrl: 'modules/registration/views/invitation.newCompany.html',
          controller: 'invitationNewCompanyController',
          onEnter: function(){
            console.log('Activating state new company');
          }
        })

        .state('registrationOfNewUser', {
          url: '/registration/newUser/:registrationId',
          templateUrl: 'modules/registration/views/registration.newUser.html',
          controller: 'registrationNewUserController',
          onEnter: function(){
            console.log('Activating state new user reg');
          }
        })

        .state('registrationOfNewCompany', {
          url: '/registration/newCompany/:registrationId',
          templateUrl: 'modules/registration/views/registration.newCompany.html',
          controller: 'registrationNewCompanyController',
          onEnter: function(){
            console.log('Activating state new company reg');
          }
        })

        .state('login', {
          url: '/login',
          templateUrl: 'modules/authentication/views/login.html',
          controller: 'LoginController',
          onEnter: function(){
            console.log('Activating state home');
          }
        });

})
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('jwtTokenHttpInterceptor');
}])
//Angular UI Notification configuration;
    .config(function (NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'bottom'
        });
    })
.run(['$rootScope', '$location', '$cookies', '$http', '$window',
      function($rootScope, $location, $cookies, $http, $window){

          FastClick.attach(document.body);
//        $rootScope.globals = $cookies.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
//        }

        if ($window.sessionStorage.token) {
          $http.defaults.headers.common['x-access-token'] = $window.sessionStorage.token;
        }

        $rootScope.$on('$locationChangeStart', function(evetn, next, current) {

          if(($location.path() !== '/login') && !$window.sessionStorage.token){
//TODO: Check validy of the token, if token is invalid. Clear credentials and pass to the login page.

            var p = $location.path();
            var lastPos = p.lastIndexOf("/");
            // var strId = p.slice(-24);
            var strId = p.substring(p.length-24,p.length);
            var strBeg = p.substring(0,lastPos + 1);

            // var strBeg = p.slice(0,lastPos + 1);

            var patt1 = /[0-9a-fA-F]+/ ;
            // /[\da-f]/i;

            // /( [0-9] | [a-f] ){24}/

            // var patt1 = new RegExp("( [0-9] | [a-f] ){24}","g")
            // var result1 = strId.match(patt1);
            var result1 = patt1.test(strId);

            if ((strBeg == '/invitation/newCompany/') && result1){
              $location.path('/invitation/newCompany/' + strId);
            }else if ((strBeg == '/invitation/newUser/') && result1){
              $location.path('/invitation/newUser/' + strId);
            }else if ((strBeg == '/registration/newCompany/') && result1){
              $location.path('/registration/newCompany/' + strId);
            }else if ((strBeg == '/registration/newUser/') && result1){
              $location.path('/registration/newUser/' + strId);
            }else{
              $location.path('/login');
            };
          }
        });


      }]);
