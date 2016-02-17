$(document).ready(function() {

	var HOURS_IN_WEEK  = 40; 	// standard hours in a work week
	var WEEKS_IN_MONTH = 4.3333; 	// average number of weeks in a month
	var WEEKS_IN_YEAR  = 50; 	// work weeks in a year minus vacation
	var MONTHS_IN_YEAR = 12; 	// months in a year
	var MEDIAFLY_COSTS = 50; 	// cost per seat

	$('.sliders').on("slide", function(event,ui){
		recalculate();
	});
	
	$('input.inputSliders').change(function() {
		recalculate();		
	});

	// Cost of presentations per month.
	function costOfPresentations() {
	
		var salary = $('input#salesrepEarnings').val().replace(/[^\d.]/g, "");           
		var hours  = $('input#timeSearchCreate').val();
		var total  = salary * hours * WEEKS_IN_MONTH / (WEEKS_IN_YEAR * HOURS_IN_WEEK);	// added ()
		total = Math.round(total);
		total = addCommas(total);
	
		$('#cost-of-presentations-total').html(total);
		return total;
	}

	function timeLostPerWeek () {
		var hours = $('input#timeSearchCreate').val();
		var total = hours * WEEKS_IN_MONTH;
		total = Math.round(total);
		$('#time-lost-per-week-total').html(total);
		return total;
	}

	function totalSalesForceCost () {
	
		var salary    = $('input#salesrepEarnings').val().replace(/[^\d.]/g, "");
		var hours     = $('input#timeSearchCreate').val();
		var employees = $('input#salesForce').val().replace(/[^\d.]/g, "");
	
		var total      = salary / WEEKS_IN_YEAR / HOURS_IN_WEEK * hours * WEEKS_IN_MONTH * employees;
		total = Math.round(total);
		var totalHours = hours * WEEKS_IN_MONTH * employees;
		total = addCommas(total);
		totalHours = Math.round(totalHours);
		totalHours = addCommas(totalHours);
		$('#sales-force-cost-total').html(total);
		$('#sales-force-hours-total').html(totalHours);
				
		return total;
	}

	function mediaflyCosts () {
		var employees = $('input#salesForce').val().replace(/[^\d.]/g, "");
		var total     = employees * MEDIAFLY_COSTS;
		total = addCommas(total);
		$('#mediafly-costs-total').html(total);	//does not exist			
		return total;
	}


	function morePresentationHours() {
		var hours   = $('input#timeSearchCreate').val();
		var percent = ($('input#manualReps').val()) * .01;	
		var total   = (hours * percent) * WEEKS_IN_MONTH;
		total       = Math.round(total)

		$('#more-presentation-hours-total').html(total);
		
		return total;
	
	}

	function revenueGain () {
		var employees         = parseInt($('input#salesForce').val().replace(/[^\d.]/g, ""));
		var salesrepEarnings  = parseInt($('input#salesrepEarnings').val().replace(/[^\d.]/g, ""));
		var meetings          = parseInt($('#in-person').val());
		var timeSearchCreate  = parseInt($('#timeSearchCreate').val());
		var spend             = parseInt($('#print-ship').val().replace(/[^\d.]/g, ""));

		var revenue           = $('input#yearlyRev').val().replace(/[^\d.]/g, "");
		var savings           = parseInt($('#printShip-savings').val().replace(/[^\d.]/g, ""));
		var extraMeetings     = parseInt($('#extraHours').val());
		
		
		
		meetings = parseInt(meetings, 10);
		extraMeetings = parseInt(extraMeetings, 10);
	
		
		// 	total = (employees * revenue) / (WEEKS_IN_YEAR * meetings) * extraMeetings * 12;
		//  factor in the print and shipping savings.
		
		// var total = (meetings + (extraMeetings / WEEKS_IN_MONTH));
		// total     = total * revenue * employees;
		// total     = Math.round(total);
		// total     = total + (spend * savings);
		// var yearlySalesrepEarnings = employees * salesrepEarnings;
		var variable = (meetings + timeSearchCreate + extraMeetings) / 3 / HOURS_IN_WEEK;
		var variable2 = (employees * salesrepEarnings * variable * 1.0);
		var total = variable2 + savings + spend + revenue/(meetings + timeSearchCreate + extraMeetings);
		total = Math.round(total);
		total = addCommas(total);
		
		$('#revenue-gain-total').html(total);
		// $('#roi-total').html(total);

		return total;
	}


	// Execute the math as the fields change.
	function recalculate() {
		costOfPresentations();
		timeLostPerWeek();
		totalSalesForceCost();
		mediaflyCosts();
		morePresentationHours();
		revenueGain();
		
	}


// ===================
// = Utility scripts =
// ===================

function addCommas(nStr)
{
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
	// End of app.js

});
