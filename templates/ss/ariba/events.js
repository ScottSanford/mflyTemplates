var AribaEventsController = function () {
	
	var back = false,
		areControlBarsOpen = false;
		
	return {
		
		init: function () {
			
			this.bindHistoryListeners();
			this.bindListeners();
			this.bindNavigationListeners();
			this.bindSalesPlaySelectorListeners();
		},
		
		bindHistoryListeners: function () {
			
			var thisController = this;
			
			// Establish Variables
			var History = window.History, // Note: We are using a capital H instead of a lower h
				State = History.getState(),
				$log = $('#log');
				
			// Log Initial State
			// History.log('initial:', State.data, State.title, State.url);
			
			// Bind to State Change
			History.Adapter.bind(window,'statechange', function() { // Note: We are using statechange instead of popstate
				// Log the State
				var State = History.getState(); // Note: We are using History.getState() instead of event.state
				// History.log('statechange:', State.data, State.title, State.url);
				
				if(!State.data.section) {

					State.data.section = "home";
					State.data.action = "showSection";
					State.data.breadcrumbs = { "section": "home" };
				}

				switch(State.data.action) {
					case "showSection":
						aribaController.showSection(State.data.section);
						break;
						
					case "renderSelling":
						aribaController.renderSelling(State.data.ids, State.data.section);
						break;
						
					case "renderAssets":
						aribaController.renderAssets(State.data.section, State.data.id);
						break;
				}
			});
		},
		
		bindListeners: function () {
			
			/* Exit */
			$(document).on("touchstart", ".exit", function () {
				if (areControlBarsOpen) {
					window.open("mfly://control/hideControlBars");
					$("#bottomLinks").remove();
					areControlBarsOpen = false;
				} else {
					window.open("mfly://control/showControlBars");
					areControlBarsOpen = true;
				}
			}),
			

			// Render Favorites

			$(document).on("click touchstart", "#home header #favorite-collections", function () {
				window.open("mfly://control/showCollections?x=622&y=35&w=0&h=0");
			});

			
			$(document).on("click touchstart", ".portrait #home header #favorite-collections", function () {
				window.open("mfly://control/showCollections?x=380&y=35&w=20&h=20");
			});
			// leave above

			$(document).on("touchstart", ".landscape .search", function () {
				window.open("mfly://control/showSearch?x=960&y=640&w=15&h=54");
			});
			
			// $(document).on("click touchstart", ".landscape #home .icon[name='collections']", function () {
			// 	window.open("mfly://control/showCollections?x=375&y=310&w=20&h=20");
			// });
			
			$(document).on("click", ".landscape nav#bottomLinks [name='search']", function () {
				window.open("mfly://control/showSearch?x=815&y=660&w=15&h=54");
			});
			
			$(document).on("click touchstart", ".landscape nav#bottomLinks [name='collections']", function () {
				window.open("mfly://control/showCollections?x=480&y=690&w=10&h=10");
			});

			
			
			/* Portrait */
			$(document).on("touchstart", ".portrait .search", function () {
				window.open("mfly://control/showSearch?x=680&y=870&w=15&h=54");
			});
			
			// $(document).on("click touchstart", ".portrait #home .icon[name='collections']", function () {
			// 	window.open("mfly://control/showCollections?x=240&y=380&w=20&h=20");				
			// });
			
			$(document).on("click", ".portrait nav#bottomLinks [name='search']", function () {
				window.open("mfly://control/showSearch?x=690&y=910&w=15&h=54");
			});
			
			$(document).on("click touchstart", ".portrait nav#bottomLinks [name='collections']", function () {
				window.open("mfly://control/showCollections?x=350&y=940&w=10&h=10");
			});			
			
			// Video
			$(document).on("click", ".video[id]", function() {

				var id = $(this).attr("id");
				window.open("mfly://item/" + id);
			});
			
			
			
			// Render Assets Page
			$(document).on("click", ".solution[id]", function(e) {

				var id = $(this).attr("id"),
					name = $(this).find(".title").html();
				e.preventDefault();
				History.pushState({"section": name, "action": "renderAssets", "id": id, "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderAssets", "id": id });
			});

			$(document).on("click touchstart", ".solutionsItem .assets", function() {

				var id = $(this).closest(".solutionsItem").attr("id"),
					name = $(this).closest(".solutionsItem").find(".name").html();

				History.pushState({"section": name, "action": "renderAssets", "id": id, "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderAssets", "id": id });
			});


			// Render New Items Page
			$(document).on("click touchstart", "#new-items", function(e) {
				$("#bottomLinks").show();
				$(".search.button").hide();
        $('.email-share').hide();
				var id = "NewItemsArray",
					name = "New Items"
				e.preventDefault();					
				History.pushState({"section": name, "id": id, "action": "renderAssets", "id": id, "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderAssets", "id": id });

			});
			
			
			// Open Options
			$(document).on("click touchstart", ".asset[id] .add", function(event) {
				var id = $(this).closest(".asset").attr("id");
				aribaController.renderPopupMessage(id, $(this));
			
				event.stopPropagation();
			
			
				// $("<div></div>")
				// 	.addClass("overlay")
				// 	.addClass("cancel")
				// 	.prependTo("body")

			});

			$(document).on("touchstart", ".assetPopup a", function () {
				setTimeout(function () {
					$(".assetPopup").remove();
				}, 500);
			}),

			$(document).on("touchstart", "body", function (e) {
				
				e.stopPropagation();

				if($(e.target).closest(".assetPopup").size() == 0){
					$(".assetPopup").remove();
				}
			});
			
			$(document).on("click touchstart", ".cancel", function  (e) {
				e.preventDefault();
				$(".overlay").remove();
				$(".assetPopup").remove();

			})

			// Open Asset
			$(document).on("click", ".asset[id] .thumbnail", function() {
				
				var id = $(this).closest(".asset").attr("id"),
					name = $(this).closest(".asset").find(".name").html(),
					type = $(this).closest(".asset").attr("type");
					
				if(type == "folder") {
					History.pushState({"section": name, "action": "renderAssets", "id": id, "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
					breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderAssets", "id": id });

				} else {
					window.open("mfly://item/" + id);
				}
			});
		},

		bindNavigationListeners: function () {

			var thisController = this;
			
			// Home Page Navigation & Breadcrumbs
			
			$(document).on("click touchstart", "#home .inner .icon[active=true]", function(e) {
				var name = $(this).attr("name");
				// this stops the home screen buttons from double-clicking.
				
				e.preventDefault();
				e.stopPropagation();
				
				// aribaController.showSection(name);
				History.pushState({"section": name, "action": "showSection", "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
			});




			// $(document).on("click touchstart", "#home header #favorite-collections", function(e) {
			// 	console.log("fooo favorites")
			// 	var name = $(this).attr("name");
			// 	// this stops the home screen buttons from double-clicking.
			// 	
			// 	e.preventDefault();
			// 	e.stopPropagation();
			// 	
			// 	// aribaController.showSection(name);
			// 	History.pushState({"section": name, "action": "showSection", "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
			// });

	
			
			// Bottom Navigation
			$(document).on("click touchstart", "nav#bottomLinks .navItem", function() {
				
				var name = $(this).attr("name"),
					active = $(this).attr("active");
				
				if (active == "true" || name == "home") {
					History.pushState({"section": name, "action": "showSection", "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				}
			});

			//Back
			$(document).on("click touchstart", "div.navItem[name=back]", function () {
				History.back();

				var state = History.getState();
				breadcrumbsController.renderBreadcrumbs(state.data.breadcrumbs);
			});

		},

		bindSalesPlaySelectorListeners: function () {

			// Sales Play Selector page
			$(document).on("click touchstart", ".box .button", function() {
				
				var $questionWrapper = $(this).closest(".box");

				$(this).addClass("selected");
				$(this).siblings().removeClass("selected");
				
				if($(this).hasClass("yes")) {
					$questionWrapper.attr("status", "yes");
					
				} else if ($(this).hasClass("no")) {
					$questionWrapper.attr("status", "no");
				}
			});
			
			$(document).on("click", ".submitForm", function () {
				
				var selection1Status = $("[selection=1]").attr("status"),
					selection2Status = $("[selection=2]").attr("status"),
					selection3Status = $("[selection=3]").attr("status"),
					name,
					ids;
					
				if(selection1Status == "no" && selection2Status == "no" && selection3Status == "yes") {
					// Collaborative Finance
					name = "Collaborative Finance";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44733"];
					
				} else if (selection1Status == "yes" && selection2Status == "yes" && selection3Status == "no") {
					//Collaborative Commerce & mras
					name = "Collaborative Commerce & MRAS";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44727", "9e8791d09fc148878d3b2e177ed2b5d7product44709"];
					
				} else if (selection1Status == "no" && selection2Status == "yes" && selection3Status == "no") {
					//Collaborative Commerce & mras
					name = "Collaborative Commerce & MRAS";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44727", "9e8791d09fc148878d3b2e177ed2b5d7product44709"];
					
				} else if (selection1Status == "no" && selection2Status == "no" && selection3Status == "no") {
					//Procure-to-Pay + MRAS Play
					name = "Procure-to-Pay & MRAS";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44717", "9e8791d09fc148878d3b2e177ed2b5d7product44709"];
					
				} else if (selection1Status == "yes" && selection2Status == "no" && selection3Status == "no") {
					//Procure-to-Pay + MRAS Play
					name = "Procure-to-Pay + MRAS Play";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44717", "9e8791d09fc148878d3b2e177ed2b5d7product44709"];
					
				} else {
					// Collaborative Finance
					name = "Collaborative Finance";
					ids = ["9e8791d09fc148878d3b2e177ed2b5d7product44733"];
				}

				History.pushState({"section": name, "action": "renderSelling", "ids": ids, "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderSelling", "ids": ids });
			});
			
			$(document).on("click touchstart", ".solutionsItem .options span[id]", function () {
				

				var id = $(this).attr("id"),
					name = $(this).html();

				History.pushState({"section": name, "action": "renderSelling", "ids": [id], "breadcrumbs": breadcrumbsController.getBreadcrumbs()}, null, "?section=" + name);
				breadcrumbsController.addToBreadcrumb({ "section": name, "action": "renderSelling", "id": id });
			});
		}
	}
}