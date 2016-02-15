angular.module('mflyTemplateApp').factory('mflyTemplates', function($http, $q, $location) {

    var mflyTemplates = {

        getGoogleDocsData: function(googleKey, worksheetNumber) {
            var deferred = $q.defer();
            // import data from Google Sheets
            var ds = new Miso.Dataset({
                importer: Miso.Dataset.Importers.GoogleSpreadsheet,
                parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
                key: googleKey,
                worksheet: worksheetNumber
            });

            ds.fetch().done(function(){
                // turn into JSON
                var jsonData  = ds.toJSON();
                deferred.resolve(jsonData);
            });

            return deferred.promise;
        },

        addColors: function(a,b,c) {
            var colors = {
                primary: a, 
                secondary: b, 
                tertiary: c, 
            }

            return colors;
        },

        getLogo: function() {
            return 'common/img/logo.png';
        }, 

        getUIBackgroundImage: function() {
            return 'common/img/ui-background.jpg';
        },

        getMyItemsImage: function() {
            return 'common/img/my-items.png';
        },

        initDataTable: function() {
           
            var obj = {
                inputField: '', 
                sortReverse: false
            }

            return obj;

        },

        makePieChart: function(jsonData) {
            var dataArr = [];
            for (var i = 0; i < jsonData.length; i++) {
                var obj = {
                    name: jsonData[i].Supplier, 
                    y: jsonData[i].UnitShare, 
                    tooltip: jsonData[i].Units
                }
                dataArr.push(obj);
            }

            var obj = {
                util: dataArr,
                titleText: 'Units', 
                tooltip: 'Units: '
            }

            var chart = UtilData.pieChart(obj.titleText, obj.util, obj.tooltip);

            return chart;
        },

        makeBarChart: function() {}, 

        // mflyCommands Wrappers 

        getFolder: function(folderID) {       
            var deferred = $q.defer();

            mflyCommands.getFolder(folderID)
                .done(function(data){
                    deferred.resolve(data);
                })

            return deferred.promise;
        },

        getItem: function(folderID) {
            var deferred = $q.defer();

            mflyCommands.getItem(folderID)
                .done(function(data){
                    deferred.resolve(data);
                })

            return deferred.promise;
        },

        openFolder: function(folderID) {
            window.location = 'mfly://folder/' + folderID;    
            // mflyCommands.openFolder(folderID);
        }, 

        searchFolders: function(searchTerm) {
           
            var deferred = $q.defer();

            mflyCommands.search(searchTerm).done(function(data){
                deferred.resolve(data);              
            });            

            return deferred.promise;
        }

    };

    // local vars and functions 
    function pieChart(titleText, dataPoints, tooltip) {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'pieChart', 
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false, 
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: titleText
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + tooltip + UtilData.numberWithCommas(this.point.tooltip);
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#F4C74E',
                        formatter: function () {
                            return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(2) + '%';
                        }
                    }
                }
            },
            series: [{
                name: "Suppliers", 
                colorByPoint: true, 
                data: dataPoints
            }]
        });
    };

    return mflyTemplates;
 
});