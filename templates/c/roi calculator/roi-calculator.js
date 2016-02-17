$(document).ready(function(){

    //bind event listeners

    document.ontouchmove = function(event){
        event.preventDefault();
      var target = event.target;
      var myId = $(target).attr('id');
      if (myId == 'wrapper' || typeof(myId) == 'undefined'){
        event.preventDefault();
      }
    }
    
    $('input').blur(function () {
        $(window).scrollTop(0);
    });    

    $('input.thousand, input.dollarSign, input.dollarSign2, input.dollarSign3').focus(function(){
            $(this).val(function(i, oldVal){
              return oldVal.replace(/,/g,"");            
            });
    });

    $('#topHalf').hammer().on("swipeleft" , function(){
      // mflyCommands.next();
      var prefix = "mfly://";
      
      console.log("You swiped LEFT!");
      return false;
    })

    $('#topHalf').hammer().on("swiperight" , function(){
      // mflyCommands.previous();
      console.log("You swiped RIGHT!");
      return false;
    })

    bindEventListeners();
    initCurrentSliders();

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
  // initialize vertical sliders  

      function initCurrentSliders() {
          $(function() {
                    $( "#slider1" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 50000,
                        max: 295000,
                        value: 172500,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#salesrepEarnings" ).val('$' + addCommas(ui.value) );
                            }
                    });
              $( "#salesrepEarnings" ).val('$' + $( "#slider1" ).slider( "value" ) );
              });

              $(function() {
                    $( "#slider2" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 1,
                        max: 1000,
                        value: 500,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#salesForce" ).val( addCommas(ui.value) );
                            }
                    });
              $( "#salesForce" ).val( $( "#slider2" ).slider( "value" ) );
              });

              $(function() {
                    $( "#slider3" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 1,
                        max: 24,
                        value: 12,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#timeSearchCreate" ).val( ui.value );
                            }
                    });
              $( "#timeSearchCreate" ).val( $( "#slider3" ).slider( "value" ) );
              });    

              $(function() {
                    $( "#slider4" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 100,
                        max: 1000000,
                        value: 500050,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#print-ship" ).val('$' + addCommas(ui.value) );
                            }
                    });
                $( "#print-ship" ).val('$' + $( "#slider4" ).slider( "value" ) );
              }); 

              $(function() {
                    $( "#slider5" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 1,
                        max: 30,
                        value: 15,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#in-person" ).val( ui.value );
                            }
                    });
                $( "#in-person" ).val( $( "#slider5" ).slider( "value" ) );
              });         
      }

              $(function() {
                    $( "#slider6" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 100000,
                        max: 3000000,
                        value: 1550000,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#yearlyRev" ).val('$' + addCommas(ui.value) );
                            }
                    });
              $( "#yearlyRev" ).val('$' + $( "#slider6" ).slider( "value" ) );
            }); 


                  $(function() {
                          $( "#slider7" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#manualReps" ).val( ui.value );
                                  }
                          });
                    $( "#manualReps" ).val( $( "#slider7" ).slider( "value" ) );
                  }); 

                  $(function() {
                          $( "#slider8" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#printShip-savings" ).val('$' + ui.value );
                                  }
                          });
                    $( "#printShip-savings" ).val('$' + $( "#slider8" ).slider( "value" ) );
                  });     

                  $(function() {
                          $( "#slider9" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#extraHours" ).val( ui.value );
                                  }
                          });
                    $( "#extraHours" ).val( $( "#slider9" ).slider( "value" ) );
                  });   

        function initSecondSliders() {

                $(function() {
                    $( "#slider6" ).slider({
                        orientation: "vertical",
                        range: "min",
                        min: 100000,
                        max: 3000000,
                        value: 1550000,
                        animate: true,
                        slide: function( event, ui ) {
                            $( "#yearlyRev" ).val('$' + addCommas(ui.value) );
                            }
                    });
                      $( "#yearlyRev" ).val('$' + $( "#slider6" ).slider( "value" ) );
                    }); 

                            $(function() {
                          $( "#slider7" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#manualReps" ).val( ui.value );
                                  }
                          });
                    $( "#manualReps" ).val( $( "#slider7" ).slider( "value" ) );
                  }); 

                  $(function() {
                          $( "#slider8" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#printShip-savings" ).val('$' + ui.value );
                                  }
                          });
                    $( "#printShip-savings" ).val('$' + $( "#slider8" ).slider( "value" ) );
                  });     

                  $(function() {
                          $( "#slider9" ).slider({
                              orientation: "vertical",
                              range: "min",
                              min: 0,
                              max: 100,
                              value: 50,
                              animate: true,
                              slide: function( event, ui ) {
                                  $( "#extraHours" ).val( ui.value );
                                  }
                          });
                    $( "#extraHours" ).val( $( "#slider9" ).slider( "value" ) );
                  }); 
        }

        function initoutputNumbers() {
          $('#revenue-gain-total').html('1,000,000');
          $('.currency_total').html('1,000');
          $('.currency_rep').html('1,000');
          $('.time_total').html('1,000');
          $('.time_rep').html('1,000');
        }


    function bindEventListeners () {
        $('.expectations').click(function(){

            $('.currentGroup').hide();
            $('.expectationsGroup').show();

            $(".expectations").removeClass("tabSlider-nonactive");
            $(".current_tab").removeClass("tabSlider-active");

            $(".expectations").addClass("tabSlider-active");
            $(".current_tab").addClass("tabSlider-nonactive");

         });

        $('.current_tab').click(function(){

            $('.expectationsGroup').hide();
            $('.currentGroup').show();

            $(".current_tab").removeClass("tabSlider-nonactive");
            $(".expectations").removeClass("tabSlider-active");            

            $(".current_tab").addClass("tabSlider-active");
            $(".expectations").addClass("tabSlider-nonactive");

        });
    };  

    enquire.register("screen and (min-width:968px)", function(){
        $(".currentGroup").draggable({
          axis: "x",
          containment: [-252, 0, 0, 0], 
          scrollSensitivity: 100
        });   
        $(".expectationsGroup").draggable({
          axis: "x",
          containment: [0, 0, 0, 0], 
          scrollSensitivity: 100
        });
    })

    enquire.register("screen and (max-width:967px)", function(){
       $(".currentGroup").draggable({
          axis: "x",
          containment: [-504, 0, 0, 0], 
          scrollSensitivity: 100
       });
       $(".expectationsGroup").draggable({
          axis: "x",
          containment: [-252, 0, 0, 0], 
          scrollSensitivity: 100
       });
    });

    enquire.register("screen and (max-width:736px)", function(){
       $(".currentGroup").draggable({
          axis: "x",
          containment: [-700, 0, 0, 0], 
          scrollSensitivity: 100
       });
       $(".expectationsGroup").draggable({
          axis: "x",
          containment: [-450, 0, 0, 0], 
          scrollSensitivity: 100
       });
    });

    // iPhone6 Portrait
    enquire.register("screen and (max-width:414px)", function(){
       $(".currentGroup").draggable({
          axis: "x",
          containment: [-1340, 0, 0, 0], 
          scrollSensitivity: 100
       });
       $(".expectationsGroup").draggable({
          axis: "x",
          containment: [-1000, 0, 0, 0], 
          scrollSensitivity: 100
       });
    });

    $('input[type=text]').click(function(){ 
        $(this).focus(); 
    });

    $(".ui-slider-handle").draggable();

      function changeInput() {
              $("#salesrepEarnings").change(function() {

                var nStr = $(this).val();
                $("#slider1").slider("value" , $(this).val(addCommas(nStr)))
            });

              $("#salesForce").change(function() {
                $("#slider2").slider("value" , $(this).val())
            });

              $("#timeSearchCreate").change(function() {
                $("#slider3").slider("value" , $(this).val())
            });

              $("#print-ship").change(function() {
                var nStr = $(this).val();
                $("#slider4").slider("value" , $(this).val(addCommas(nStr)))
            });

              $("#in-person").change(function() {
                $("#slider5").slider("value" , $(this).val())
            });

              $("#yearlyRev").change(function() {
                var nStr = $(this).val();
                $("#slider6").slider("value" , $(this).val(addCommas(nStr)))
            });

              $("#manualReps").change(function() {
                $("#slider7").slider("value" , $(this).val())
            });

              $("#printShip-savings").change(function() {
                $("#slider8").slider("value" , $(this).val())
            });

              $("#extraHours").change(function() {
                $("#slider8").slider("value" , $(this).val())
            });

      };

      changeInput();

function initInputFocus() {
  $(".hackValue").hide();
  $(".dollarSign").show().focus();
};   

function initInputFocus2() {
  $(".hackValue2").hide();
  $(".dollarSign2").show().focus(); 
};

function initInputFocus3() {
  $(".hackValue3").hide();
  $(".dollarSign3").show().focus(); 
};

$(".hackValue").click(function(){
  initInputFocus();
});

$(".hackValue2").click(function(){
  initInputFocus2();
});

$(".hackValue3").click(function(){
  initInputFocus3();
});

$("#slider1").on("slide" , function(event, ui){
    $(".hackValue").hide();
    $(".dollarSign").show();
});

$("#slider4").on("slide" , function(event, ui){
    $(".hackValue2").hide();
    $(".dollarSign2").show();
});

$("#slider6").on("slide" , function(event, ui){
    $(".hackValue3").hide();
    $(".dollarSign3").show();
});


$('input.thousand, input.dollarSign, input.dollarSign2, input.dollarSign3, input#printShip-savings').blur(function(){
      var target = $(this).val();
      $(this).val(addCommas(target));


});

$('input.dollarSign').change(function(){
      var target = $(this).val();
      $(this).val(addCommas(target));

       var splitInteger = target.split('$')[1].replace(/,/g,"");
       console.log(splitInteger);
       console.log("yo dawg, you have to work!");

       $("#slider1").slider("value", splitInteger); 
});

$('input.dollarSign2').change(function(){
      var target = $(this).val();
      $(this).val(addCommas(target));

       var splitInteger = target.split('$')[1].replace(/,/g,"");

       $("#slider4").slider("value", splitInteger); 
});

$('input.dollarSign3').change(function(){
      var target = $(this).val();
      $(this).val(addCommas(target));

       var splitInteger = target.split('$')[1].replace(/,/g,"");
       console.log(splitInteger);
       console.log("yo dawg, you have to work!");

       $("#slider6").slider("value", splitInteger); 
});

$('input#printShip-savings').change(function(){
      var target = $(this).val();
      $(this).val(addCommas(target));

       var splitInteger = target.split('$')[1].replace(/,/g,"");
       console.log(splitInteger);
       console.log("yo dawg, you have to work!");

       $("#slider8").slider("value", splitInteger); 
});

// end of controls

$('.arrow-left').bind("touchstart click" , function(){
  mflyCommands.previous();
  console.log("I've been clicked yo!");
})

$('.arrow-right').bind("touchstart click" , function(){
  mflyCommands.next();
  console.log("I've been clicked too yo!");
})

$('.refresh-btn').bind("touchstart click" , function(){
    initCurrentSliders();
    initSecondSliders();
    initoutputNumbers();
})

    var documentWidth = $(document).width();

    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      console.log('The document is greater than 1024');
      $('.currentGroup').draggable('disable');
      $('.expectationsGroup').draggable('disable');
    }

}); // end of document ready :) 
