$(function () {

    document.ontouchmove = function(event){
          event.preventDefault();
    }

    $(document).ready(function () {

        $('.exit').on('touchstart click', function(){
            mflyCommands.close();
        })
        $("#loading").show();

        initDataset();
    });

});

var areControlBarsOpen = false;

$(document).bind("mobileinit", function () {
    $.event.special.swipe.horizontalDistanceThreshold = 130;
});

$('.exit').live('click', function (e) {
    window.open("mfly://control/done");
});

function initDataset() {
    ds = new Miso.Dataset({
        importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        key: "0AmFnz8GniHktdGZYMDEzcmRhWm5walllSURVVWltLUE",
        worksheet: "1"
    });

        // ds = new Miso.Dataset({
        //     importer: Miso.Dataset.Importers.GoogleSpreadsheet,
        //     parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
        //     key: "1uCfi_rEzrFF5ZUrTU6qmgyRWPp4b-kzXLSw6wf5xp0A",
        //     worksheet: '4'
        // });

    ds.fetch().done(fetchSuccess);

    /** TEMPORARY XXX **/
    _ds = ds;
}    

function fetchSuccess() {
    //console.log("FETCH successful! ds=", ds);

    // Save JSON
    // console.log("Saving JSON: " , ds.toJSON());
    // XXX

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Total Brand Retail'
        },
        xAxis: {
            categories: ['July', 'August', 'September', 'October', 'November'], 
            title: {
                text: 'Months'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Sales'
            }
        },
        legend: {
            align: 'right',
            x: -100,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        // when user hovers over a series or point
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': $' + this.y + '<br/>' +
                    'Total: $' + this.point.stackTotal;
            }
        },
        // pie chart at bottom?
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            $("#loading").show();

                            var month = $(this)[0].category;
                            var category = $(this)[0].series.name;

                            $("#subchart_container").show();

                            // Pull data from Dataset
                            var data = ds.rows(function (row) {

                                return row.Month === month && row.Team === category;

                            }).columns(['Region', 'Sales']).toJSON();

                            // Remap Sales to y and Product to name for Highcharts
                            $.each(data, function (i, point) {
                                point.y = point.Sales;
                                point.name = point.Region;
                            });

                            // Set data into Highcharts
                            subchart.series[0].setData(data);

                            $("#loading").hide();
                        }
                    }
                }
            }
        },
        series: [{
                name: 'East',
                data: ds.rows(function (row) {
                    return row.Team === 'East';
                }).groupBy('Month', ['Sales']).column('Sales').data
            }, {
                name: 'North',
                data: ds.rows(function (row) {
                    return row.Team === 'North';
                }).groupBy('Month', ['Sales']).column('Sales').data
            }, {
                name: 'South',
                data: ds.rows(function (row) {
                    return row.Team === 'South';
                }).groupBy('Month', ['Sales']).column('Sales').data
            }, {
                name: 'West',
                data: ds.rows(function (row) {
                    return row.Team === 'West';
                }).groupBy('Month', ['Sales']).column('Sales').data
            }, {
                name: 'TopCo & Direct',
                data: ds.rows(function (row) {
                    return row.Team === 'TopCo & Direct';
                }).groupBy('Month', ['Sales']).column('Sales').data
            }
        ]
    });


    subchart = new Highcharts.Chart({
        chart: {
            renderTo: 'subchart_container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Revenue Total by Zone/Region'
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: $' + this.y;
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
                        return '<b>' + this.point.name + '</b>: ' + (this.percentage).toFixed(2) + ' %';
                    }
                }
            }
        },
        series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Shaw', 90.0],
                    ['Coro', 36.8],
                    ['Xinhua', 18.2],
                ]
            }
        ]
    });

    $("#loading").hide();
}

function mflyResume() {
    // On resume, re-initialize dataset
    initDataset();
    $("#subchart_container").hide();
}