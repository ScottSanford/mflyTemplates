angular.module('reportingApp').controller('ToptenCtrl', function($scope, summaryData){

		$scope.fromDate = null;
    	$scope.untilDate = null;

    	$scope.search = function(){
			if ($scope.toptenForm.$valid) {

        		var f = summaryData.filter(inputDateRangeFilter)
        						   .filter(checkIfActiveUser)
        						   .filter(checkIfNotGuest)
        						   .map(fixViewsCount);

       			$scope.topUsers = flattenUsers(f).slice(0, 10);
			}
    	}

		var fixViewsCount = function(record) {

  			record.Views = Number(record.Views) - 1;
			return record;
		}

    	function flattenUsers(filteredUserRecords) {

		    var users = [];		    
		    for (var i = 0; i < filteredUserRecords.length; i++) {

		    	var user = getUser(filteredUserRecords[i], users);
		    	if (user === null) {
		    		users.push(filteredUserRecords[i]);
		    	} else {
		    		user.Views = Number(user.Views) + Number(filteredUserRecords[i].Views);
		    	}
		    }

    		return users.sort(compareViewCount).reverse();
    	}

    	function getUser(userRecord, userRecords) {

    		for(var i = 0; i < userRecords.length; i++) {
    			if (userRecords[i].User == userRecord.User) {
    				return userRecords[i];
    			}
    		}

    		return null;
    	}

    	function inputDateRangeFilter(row) {
    		var rowDate = new Date(row.IntervalStart);

    		if ($scope.fromDate <= rowDate && rowDate <= $scope.untilDate) {
				return true;
			} else {
				return false;
			}

    	}

		function compareViewCount(a, b) {
			var previousNum = Number(a.Views - 1);
			var nextNum = Number(b.Views - 1);
			if (previousNum < nextNum) {
			    return -1;
			}
			if (previousNum >= nextNum) {
			    return 1;
			}
		}

		var checkIfActiveUser = function(row){

			if (!row.User.match(/@mediafly\.com|@appirio\.com|@liveaxle\.com|john\.lark@sap\.com|gregory\.spray@sap\.com|kami\.kawai@sap\.com|Guest of|Share Link/)) {
				return true;
			}

			return false;
		};

		var checkIfNotGuest = function(row) {

			if (row.User.match(/Guest of/)) {
				return false;
			}

			return true;
		};

		var uniqueUser = function(row) {
			if (row.indexOf(row.User) === -1) {
				return true;
			}
				return false;
		}

		var addDuplicateUserViews = function(data, row) {
			if (data.indexOf(row) >= 0) {
				row.Views++
			}
		}
	})