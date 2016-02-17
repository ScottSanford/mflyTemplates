angular.module("mflyTemplateApp", [
        'ngRoute', 
        'myDirectives'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|https:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'components/side-bar-nav/home.html',
                    controller: 'HomeCtrl'
                })                
                .when('/sub-folder', {
                    templateUrl: 'components/side-bar-nav/sub-folder.html',
                    controller: 'SubFolderCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
          });
        