angular.module("mflyTemplateApp", [
        'ngRoute', 
        ])

        .config(function ($routeProvider, $compileProvider) { 

              $compileProvider.imgSrcSanitizationWhitelist(/^(mfly:\/\/data\/entry|http:\/\/)/);  
              $routeProvider
                .when('/', {
                    templateUrl: 'components/ui/ui-1/ui-1.html',
                    controller: 'UI1Ctrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
          });
        