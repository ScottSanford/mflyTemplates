angular.module("mflyTemplateApp", [
        'ngRoute', 
        'myDirectives', 
        'smart-table', 
        'nvd3'
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|https:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'components/charts/charts.html',
                    controller: 'ChartsCtrl'
                })                
                .otherwise({
                    redirectTo: '/'
                });
          });
        