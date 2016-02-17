var valueChangeHook = function(element) {
    var $this = $(element),
    key = typeof $this.attr('name') === 'undefined' ? $this.attr('id') : $this.attr('name');
    //masterData[key] = 
     if ($this.hasClass('.save')) {
         masterData[key] = $this.text();
     }
      else {
         masterData[key] = $this.val();
     }
     calculate();
};

var calculate = function() {
   // tab-as-dollars
  key = 's12tabAsPercent';
  var percentValue = percent(masterData[key]);
  var totalSales   = convert_string_to_number($('#s12_acct_total_sales').val());
  var tabAsDollars = percentValue * totalSales;

  $('p#tab-as-dollars').text(numeral(tabAsDollars).format('$0,0'));
 
  
  // tab-beer-as-dollars
  key = 's12tabBeerAsPercent';
  var percentValue = percent(masterData[key]);
  var totalAlcoholSales = convert_string_to_number($('p#tab-as-dollars').text());
  var beerSalesDollars  = percentValue * totalAlcoholSales;

  $('p#tab-beer-as-dollars').text(numeral(beerSalesDollars).format('$0,0'));
 
  // tab-wine-as-dollars
  key = 's12tabWineAsPercent';
  var percentValue = percent(masterData[key]);
  var totalAlcoholSales = convert_string_to_number($('p#tab-as-dollars').text());
  var wineSalesDollars = percentValue * totalAlcoholSales;

  $('p#tab-wine-as-dollars').text(numeral(wineSalesDollars).format('$0,0'));
   

  // tab-spirits-as-dollars
  key = 's12tabSpiritsAsPercent';
  var percentValue = percent(masterData[key]);
  var totalAlcoholSales = convert_string_to_number($('p#tab-as-dollars').text());
  var spiritsSalesDollars = Number((percentValue * totalAlcoholSales).toFixed(2));

  $('p#tab-spirits-as-dollars').text(numeral(spiritsSalesDollars).format('$0,0'));
   

  // tab-food-as-dollars
  key = 's12tabFoodAsPercent';
  var percentValue = percent(masterData[key]);
  var totalSales = convert_string_to_number($('#s12_acct_total_sales').val());
  var foodSalesDollars = Number((percentValue * totalSales).toFixed(2));

  $('p#tab-food-as-dollars').text(numeral(foodSalesDollars).format('$0,0'));
   

  // beer-target-growth
  key = 's12growTotalBeverageBy';
  var percentValue = percent(masterData[key]);
  var beerSales = convert_string_to_number($('#tab-beer-as-dollars').text());
  var beerGrowthDollars = (beerSales * percentValue).toFixed(2);

  $('#beer-target-growth').text(numeral(beerGrowthDollars).format('$0,0'));
   

  // wine-target-growth
  key = 's12growTotalBeverageBy';
  var percentValue = percent(masterData[key]);
  var wineSales = convert_string_to_number($('#tab-wine-as-dollars').text());
  var wineGrowthDollars = (wineSales * percentValue).toFixed(2);

  $('#wine-target-growth').text(numeral(wineGrowthDollars).format('$0,0'));
   

  // spirits-target-growth
  key = 's12growTotalBeverageBy';
  var percentValue = percent(masterData[key]);
  var spiritsSales = convert_string_to_number($('#tab-spirits-as-dollars').text());
  var spiritsGrowthDollars = (spiritsSales * percentValue).toFixed(2);

   $('#spirits-target-growth').text(numeral(spiritsGrowthDollars).format('$0,0'));
 
  // figure out percents for food & drinks
  $('.percent_group_1').change(function(){
    var $selected = $(this);
    $('.percent_group_1').each(function(){
      var $other = $(this);
      if ($other.attr('id') != $selected.attr('id')) {
			$other.val(100-(convert_string_to_number($selected.val()).toFixed(1)));
				// handle %-span for programmatically changed values
				// (which don't cause 'change' events to be fired)
				if($other.val() != '') {
					$other.parent().find('span').css('display', 'block');
				} else {
					$other.parent().find('span').css('display', 'none');
				}
		save($other);
        calculate();
      }
    });
  });

  // figure out percents for drink split
  $('.percent_group_2').on('change blur',function(){
    var $selected = $(this);
		var $secondField;
		var $thirdField;
    $('.percent_group_2').each(function(){
      var $other = $(this);
      if ($other.attr('id') != $selected.attr('id')) {
				if($secondField === undefined) {
					$secondField = $other;
				} else {
					$thirdField = $other;
				}
			}
		});
		$selected.removeClass('error');
		$secondField.removeClass('error');
		$thirdField.removeClass('error');
		if($selected.val() == '' || $secondField.val() == '' || $thirdField.val() == '') {
			// if all three fields have values, don't try computing on them
			if($selected.val() != '' && $secondField.val() != '') {
				$thirdField.val((100-(convert_string_to_number($selected.val()) + convert_string_to_number($secondField.val()))).toFixed(0)).trigger('change');
				save($thirdField);
			} else if($selected.val() != '' && $thirdField.val() != '') {
				$secondField.val((100-(convert_string_to_number($selected.val()) + convert_string_to_number($thirdField.val()))).toFixed(0)).trigger('change');
				save($secondField);
	    }
      else if ($selected.val() == '') {
        $selected.val((100-(convert_string_to_number($secondField.val()) + convert_string_to_number($thirdField.val()))).toFixed(0)).trigger('change');
        save($secondField);
      }
		} else {
			if(convert_string_to_number($selected.val()) + convert_string_to_number($secondField.val()) + convert_string_to_number($thirdField.val()) != 100) {
				$selected.addClass('error');
				$secondField.addClass('error');
				$thirdField.addClass('error');
			}
		}
  });

  saveMasterData();

};
