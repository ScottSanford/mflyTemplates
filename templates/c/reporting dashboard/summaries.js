angular.module('reportingApp').controller('SummariesCtrl', function($scope, summaryData, moment){
		

		// function getRegisteredUserCount() {

		// }

		// GET LATEST RECORD *************************************
		var getLatestRecord = function() {
			// return newest record 
			var latestRecord = null;

			// loop through data
			for (var i = 0; i < summaryData.length; i++) {
				// grab date record
				var dateRecords = summaryData[i].IntervalStart;
				// parse string into date
				var dateRecordtoDate = new Date(dateRecords);
				if (latestRecord == null || latestRecord < dateRecordtoDate) {
					latestRecord = dateRecordtoDate;
				}
			}
			// return latest record date
			return latestRecord;
		}

		// CHECK ACTIVE AND GUEST USERS *****************************

		var checkIfActiveUser = function(row){

			if (!row.User.match(/@mediafly\.com|@appirio\.com|@liveaxle\.com|john\.lark@sap\.com|gregory\.spray@sap\.com|kami\.kawai@sap\.com|Guest of|Share Link/)) {
				return true;
			}

			return false;
		};

		var checkIfGuest = function(row) {

			if (row.User.match(/Guest of/)) {
				return true;
			}

			return false;
		};

		// "heavy lifting" for users
		var rollUpDataForRecord = function(rolledUpData, record) {


			// do user related things
			var isUser = checkIfActiveUser(record);
			if (isUser) {
	  			// increment allViewsCount
				rolledUpData.allViewsCount += Number(record.Views - 1);
		  		if (rolledUpData.activeUsers.indexOf(record.User) === -1) {
		  			rolledUpData.activeUsers.push(record.User);
		  		}
			}

			// do user guest things
			var isGuest = checkIfGuest(record);
			if (isGuest) {
				rolledUpData.guestUsersCount++;
				rolledUpData.guestViewsCount += Number(record.Views - 1);
			}

  			return rolledUpData;
		};

		// DATE FILTERS ***************************************************************
		// date ranges for data dates to pass through to find which "range" it belongs to
		var dateRangeFilter = function(dateRange, row) {
	
			var rowDate = new Date(row.IntervalStart);
			var rowDateFormatted = moment(rowDate);

			if (dateRange.start <= rowDateFormatted && rowDateFormatted <= dateRange.end) {
				return row;
			}
		}

		// get month number
		Date.prototype.endOfMonth = function(){
		  return new Date( 
		      this.getFullYear(), 
		      this.getMonth()
		  );
		};

		// get week ending date
		Date.prototype.endOfWeek = function(){
		  return new Date( 
		      this.getFullYear(), 
		      this.getMonth(), 
		      this.getDate() + 7 - this.getDay() 
		  );
		};

		// TABLES ********************************************************************
		// QUARTER TABLE
		function getQuarterRanges() {
			var latestRecord = getLatestRecord();

			var start = moment(latestRecord).startOf('quarter');
			var end   = moment(latestRecord).endOf('quarter');

			return [
				{ start: moment(start), end: moment(end) },
				{ start: moment(start).subtract(1, 'quarter'), end: moment(end).subtract(1, 'quarter') },
				{ start: moment(start).subtract(2, 'quarter'), end: moment(end).subtract(2, 'quarter') },
				{ start: moment(start).subtract(3, 'quarter'), end: moment(end).subtract(3, 'quarter') },
				{ start: moment(start).subtract(4, 'quarter'), end: moment(end).subtract(4, 'quarter') }
			]
		}

		function displayQuarterDate(record) { 

			var recordDate  = new Date(record.IntervalStart);

			var end = recordDate;

			return moment(end).format("QqYY");

		}

		var quarterReduction = function(previousRolledUpData, record) {

			// init rolledUpData
  			var rolledUpData = {
  				date: previousRolledUpData.date || displayQuarterDate(record),
			    activeUsers: (previousRolledUpData.activeUsers),
			    allViewsCount: Number(previousRolledUpData.allViewsCount), 
	  			guestUsersCount: previousRolledUpData.guestUsersCount,
			    guestViewsCount: Number(previousRolledUpData.guestViewsCount)
  			}; 

  			return rollUpDataForRecord(rolledUpData, record);
		};

		$scope.quarters = getQuarterRanges().map(function(quarter){

			var initValue = {
				date: moment(quarter.end).format("QqYY"),
			    activeUsers: [],
			    allViewsCount: 0, 
	  			guestUsersCount: 0,
			    guestViewsCount: 0
			};
			var data = summaryData;
			data = data.filter(dateRangeFilter.bind(this, quarter));
			data = data.reduce(quarterReduction, initValue);

			return data;
		});

		// MONTH TABLE
		function getMonthRanges() {
			var latestRecord = getLatestRecord();

			var start = moment(latestRecord).date(1);
			var end   = moment(latestRecord).endOf('month');


			var output = [
				{ start: moment(start), end: moment(end) },
				{ start: moment(start).subtract(1, 'month'), end: moment(start).subtract(1, 'month').endOf('month') },
				{ start: moment(start).subtract(2, 'month'), end: moment(start).subtract(2, 'month').endOf('month') },
				{ start: moment(start).subtract(3, 'month'), end: moment(start).subtract(3, 'month').endOf('month') },
				{ start: moment(start).subtract(4, 'month'), end: moment(start).subtract(4, 'month').endOf('month') }
			]
			return output;
		}

		function displayMonthDate(record) { 

			var recordDate  = new Date(record.IntervalStart);

			var end = recordDate.endOfMonth();

			return moment(end).format("MMM YYYY");

		}

		var monthReduction = function(previousRolledUpData, record) {

			// init rolledUpData
  			var rolledUpData = {
  				date: previousRolledUpData.date || displayMonthDate(record),
			    activeUsers: (previousRolledUpData.activeUsers),
			    allViewsCount: Number(previousRolledUpData.allViewsCount), 
	  			guestUsersCount: previousRolledUpData.guestUsersCount,
			    guestViewsCount: Number(previousRolledUpData.guestViewsCount)
  			}; 

  			return rollUpDataForRecord(rolledUpData, record);
		};

		// output to view
		$scope.months = getMonthRanges().map(function(month){


			var initValue = {
				date: moment(month.end).format("MMM YYYY"),
			    activeUsers: [],
			    allViewsCount: 0, 
	  			guestUsersCount: 0,
			    guestViewsCount: 0
			};
			var data = summaryData;
			data = data.filter(dateRangeFilter.bind(this, month));
			data = data.reduce(monthReduction, initValue);
				
			return data;
		});

		var endofWeekDate = getLatestRecord().endOfWeek();

		// get Monday, start of week
		var getMonday = moment(endofWeekDate).weekday(-6).format('l');

		// WEEK TABLE
		function getWeekRanges() {

			var latestRecord = getLatestRecord();

			var end = latestRecord.endOfWeek();
			var start = moment(end).weekday(-6);

			return [
				{ start: moment(start), end: moment(end) },
				{ start: moment(start).subtract(1, 'week'), end: moment(end).subtract(1, 'week') },
				{ start: moment(start).subtract(2, 'week'), end: moment(end).subtract(2, 'week') },
				{ start: moment(start).subtract(3, 'week'), end: moment(end).subtract(3, 'week') },
				{ start: moment(start).subtract(4, 'week'), end: moment(end).subtract(4, 'week') }
			];
		}

		function displayWeekDate(record) { 

			var recordDate  = new Date(record.IntervalStart);

			var end = recordDate.endOfWeek();

			return moment(end).format("l");
		}

		var weekReduction = function(previousRolledUpData, record) {

			// init rolledUpData
  			var rolledUpData = {
  				date: previousRolledUpData.date || displayWeekDate(record),
			    activeUsers: (previousRolledUpData.activeUsers),
			    allViewsCount: Number(previousRolledUpData.allViewsCount), 
	  			guestUsersCount: previousRolledUpData.guestUsersCount,
			    guestViewsCount: Number(previousRolledUpData.guestViewsCount)
  			}; 

  			return rollUpDataForRecord(rolledUpData, record);
		};

		$scope.weeks = getWeekRanges().map(function(week){

			var initValue = {
				date: moment(week.end).format("l"),
			    activeUsers: [],
			    allViewsCount: 0, 
	  			guestUsersCount: 0,
			    guestViewsCount: 0
			};
			var data = summaryData
				.filter(dateRangeFilter.bind(this, week))
				.reduce(weekReduction, initValue);

			return data;
		});
	
	})