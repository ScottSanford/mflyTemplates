angular.module("mflyTemplateApp", [
        'ngRoute', 
        'myDirectives', 
        'smart-table'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|https:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'components/table/table.html',
                    controller: 'TableCtrl'
                })                
                .otherwise({
                    redirectTo: '/'
                });
          });
        