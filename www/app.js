angular.module("mflyTemplateApp", [
        'ngRoute', 
        'myDirectives', 
        'smart-table', 
        'angular-mmenu'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|https:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'components/pie/pie.html',
                    controller: 'PieCtrl'
                })                
                .otherwise({
                    redirectTo: '/'
                });
          });
        