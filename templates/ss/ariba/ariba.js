var AribaController = function () {
	// Fetch Elements
	var $body = $("body"),
		$search = $(".search"),
		$breadcrumbs = $("nav#breadcrumbs"),
		$nav = $("nav#bottomLinks"),
		$emailshare = $('.email-share');
		
	return {
		
		init: function () {
			
			var aribaEventsController = new AribaEventsController();
			
			aribaEventsController.init();
			this.renderSections();
			this.reorderBottomLinks();
			this.assetCount();
		},
		
		/* Rendering Sections/Pages  ----------------------------------------------------------------------------------------------- */
		
		reorderBottomLinks: function  () {
		
			// This creates a custom order of icons for the bottom nav
			
			var bottomNavItems = new Array();
			bottomNavItems[0] = navigationJSON[0]; // Back
			bottomNavItems[1] = navigationJSON[1]; // Home
			bottomNavItems[2] = navigationJSON[3]; // Favorites Collection
			bottomNavItems[2].title = "Favorites" // To shorten it.
			bottomNavItems[3] = navigationJSON[4]; // Solutions
			bottomNavItems[4] = navigationJSON[2]; // More
			bottomNavItems[5] = navigationJSON[10]; // Search
						
			for (var i = 0; i < bottomNavItems.length; i++) {
				var section = bottomNavItems[i]
				this.renderBottomNavigation(section);
			}
						
		},
		
		// Determine how many new files are in the assets.
		assetCount: function  () {
			
			var today = moment();
			var numberOfDays = 7 //how many days to consider it new
			
			var arrayList = models.getObjArray();
			var newItems = {} // create an empty JSON object
			var newItemsArray = new Array()
			
			for (key in arrayList) {
				var myDate = moment(arrayList[key].received);
				var assetAge = today.diff(myDate, 'days');
				
				if (assetAge < numberOfDays) {
					if (arrayList[key].type != "folder") {
						if(arrayList[key].description != "ui-bundle"){
							newItemsArray.push(arrayList[key].id);
						};
					};
				};
			}
			
			newItems = {
				"id": "NewItemsArray",
				"type": "folder",
				"items": newItemsArray
			}
			
			models.addItem( newItems );
			
			
			/*
				TODO sorting on newItems.items
			*/
			
			this.renderNewItems(newItems.items)
		},
		
		renderSections: function () {

			for (var i = 0; i < navigationJSON.length; i++) {
				
				var section = navigationJSON[i],
					$sectionTemplate = $("#" + section.name + "Template").tmpl(),
					$sectionTitle = section.title,
					$scrollWrapper,
					$section;
					
				//render home page navigation icons
				this.renderHomeNavigation(section);
				
				// this.renderBottomNavigation(section);
				
				// Render Sections
				if (section.active == "true") {
					
					$scrollWrapper = 
						$("<div></div>")
							.addClass("scroll")
							.html($sectionTemplate);
							
					$scroll =
						$("<div></div>")
							.addClass("scrollWrapper")
							.html($scrollWrapper);
							
					$section = 
						$("<section></section>")
							.attr("id", section.name)
							.hide()
							.appendTo(".mainWrapper");
							
					$("#headerTemplate").tmpl(section).appendTo($section);
					$scroll.appendTo($section);
					
					if(section.name == "solutions") {
						this.renderSolutionSection();
					}
				}
			}
			
			
			// Assign width of home page icons
			var $home = $("section#home"),
				width = $home.find(".icon").size() * 226;
			
			if($home.find(".inner .icon").size() < 4) {
				$home.find(".inner").width(width);
			}
			
			$("<div></div>")
				.addClass("clear")
				.appendTo("#home .inner");
			
		},
		
		showSection: function (_sectionName) {
			var $newSection = $("section#" + _sectionName),
				$newSectionNavItem = $nav.find("[name=" + _sectionName + "]"),
				$visibleSection = $("section:visible"),
				visibleSection = $visibleSection.attr("id");
				
			if(_sectionName != "home") {
				$("div.exit").hide();
				$("body.landscape").css("background-position-y", "-110px");
				$("body.portrait").css("background-position-y", - + $("#bottomLinks").height());
				
			} else {
				$("div.exit").show();
				$("body").css("background-position-y", "0px");
			}
			
			$visibleSection.hide();
			$newSection.show();
			
			$newSectionNavItem.siblings().removeClass("selected");
			$newSectionNavItem.addClass("selected");
			
			if(_sectionName == "home") {
				$breadcrumbs.find("ul").empty();
				$nav.hide();
				$search.show();
				
				// Not all sections have a bottom nav button
				// this highlights more instead of the home icon
				
				$(".navItem[name='home']").removeClass("selected");
				$(".navItem[name='more']").addClass("selected");
				emailTimeout = setTimeout(showemail, 1000);
        
				
			} else {
				clearTimeout(emailTimeout);
				//specific to training section
				if(_sectionName == "training") {
					this.renderAssets(_sectionName, trainingId);
				}
				
				if(_sectionName == "corporate-information") {
					this.renderAssets(_sectionName, corporateinformationId);
				}
				
				if (_sectionName =="campaigns") {
					this.renderAssets(_sectionName, campaignsId);
				};
				
				if (_sectionName =="competitive-info") {
					this.renderAssets(_sectionName, competitionId);
				};
				
				
				breadcrumbsController.resetBreadcrumb();
				breadcrumbsController.addToBreadcrumb({ "section": _sectionName, "action": "showSection" });
				$nav.show();
				$search.hide();
				$emailshare.hide();

			}
			
			this.contentHeightAdjustments();
		},
		/* Sales Play Selector Summary */
		renderSolutionSection: function () {
			
			for(var i = 0; i < salesPlaySolutionsJSON.length; i++){
				
				$("<div class='column column" + i + "'></div>").appendTo("section#solutions .scroll");
				
				var $title = $("<h3></h3>").html(salesPlaySolutionsJSON[i].name);
				
				$title.appendTo("section#solutions .scroll .column" + i);
				
				for(var z = 0; z < salesPlaySolutionsJSON[i].items.length; z++){
					$template = $("#solutionItemTemplate").tmpl(salesPlaySolutionsJSON[i].items[z]);
					$template.appendTo("section#solutions .scroll .column" + i);
				}
			}
		},
		
		/* Sales Play Selector Item */
		renderSelling: function (_id, _name) {
			
			var $visibleSections = $("section:visible, .search"),
				$sectionWrapper,
				$template,
				$videoTemplate,
				solutionAdditions,
				item,
				video;
				
			$visibleSections.hide();
			
			if($("section.sectionWrapper").size() == 0){
				
				$sectionWrapper =
					$("<section></section>").
					addClass("sectionWrapper").
					html("<div class='scrollWrapper'><div class='scroll'></div></div>");
					
				$sectionWrapper.appendTo(".mainWrapper");
				
			} else {
				$sectionWrapper = $("section.sectionWrapper");
				$sectionWrapper.show().find(".scroll").empty();
			}
			
			for (var i = 0; i < _id.length; i++) {
				
				solutionAdditions = solutionsJSON[_id[i]];
				
				item = models.getItem(_id[i]);
				video = this.getFirstVideo(item);
				$videoTemplate = $("#videoTemplate").tmpl(video);
				
				$template = $("#solutionTemplate").tmpl(item);
				$template.find(".videoWrapper").html($videoTemplate);
				$template.find(".content").html(item.description);
				
				if(solutionAdditions) {
					$template.find(".assets").before("<div class='options left'></div>");
					for(var z = 0; z < solutionAdditions.options.length; z++){
						$("#solutionAdditions").tmpl(solutionAdditions.options[z]).appendTo($template.find(".options"));
					}
				}
				
				$template.appendTo($sectionWrapper.find(".scroll"));
			}
			
			this.contentHeightAdjustments();
		},
		
		/* Sales Play Selector Item Assetts */
		renderAssets: function (_name, _id) {
		
			var assets = models.getItem(_id),
				$assetsWrapper;
				


				
			if(_name == "training" || $("nav#bottomLinks").find(".selected").attr("name") == "training") {
				$assetsWrapper = $("section#training").addClass("assetsWrapper").find(".scrollWrapper .scroll");
				$assetsWrapper.empty();
				
			} else {
				$("section:visible").hide();
				
				if ($("section.assetsWrapper").not("#training").size() == 0) {
					$assetsWrapper = 
						$("<section></section>")
							.addClass("assetsWrapper")
							.html("<div class='scrollWrapper'><div class='scroll'></div></div>");
							
					$assetsWrapper.appendTo(".mainWrapper");
					
				} else { 
					$assetsWrapper = $("section.assetsWrapper").not("#training");
					$assetsWrapper.show().find(".scroll").empty();
				}
			}
			
			if(assets) {

				for (var i = 0; i < assets.items.length; i++) {
					var item = models.getItem(assets.items[i]);					
					if (item && item.type === 'folder') {
                        // if the item is a folder, add a count of items
                        var folder_count = 0;
                        item['folder_count'] = folder_count;
                    }
					$("#assetItemTemplate").tmpl(item).appendTo("section:visible .scroll");
				if (assets.id == "NewItemsArray") {
					breadcrumbsController.resetBreadcrumb();

				};
				}
			} else {
				$("<h2>There are no assets uploaded yet.</h2>").appendTo($assetsWrapper.find(".scroll"));
			}



			$("<div></div>")
				.addClass("clear")
				.appendTo($assetsWrapper.find(".scroll"));

			this.contentHeightAdjustments();
		},

		
		/* Navigations ------------------------------------------------------------------------------------------------------------- */
		renderHomeNavigation: function (_section) {
			
			if (_section.active == "true") {
				$("<div></div>")
					.addClass("left icon")
					.attr("name", _section.name)
					.attr("active", _section.active)
					.html("<span></span><h2>" + _section.title + "</h2>" )
					.appendTo("#home .inner");
					
			}			
		},
		
		renderNewItems: function (_items) {
			if (_items != 0) {
				$("<div></div>")
					.attr('id', "new-items")
					.html("<span>" + _items.length + " new items</span>")
					.appendTo("#home .inner")
			}			
		},
		
		renderBottomNavigation: function (_navItem) {
			$("<div></div>")
				.addClass("navItem")
				.addClass(_navItem.name)
				.html("<div class='icon'></div><h2>" + _navItem.title +"</h2>")
				.attr("name", _navItem.name)
				.attr("active", _navItem.active)
				.appendTo($nav.find(".inner"));
		},
		
		/* Get first video in item list -------------------------------------------------------------------------------------------- */
		getFirstVideo: function (_item) {
			for (var i = 0; i < _item.items.length; i++) {
				var item = models.getItem(_item.items[i])
				if(item.type == "Video") {
					return item;
				}
			}
		},
		
		/* Other ------------------------------------------------------------------------------------------------------------------- */
		contentHeightAdjustments: function () {
			
			var currentSection = $("section:visible"),
				bodyHeight = $(window).height(),
				breadcrumbsHeight = $("#breadcrumbs").outerHeight(),
				bottomNavHeight = $("#bottomLinks").outerHeight(),
				headerHeight,
				totalHeight;
				
			if(currentSection.find("header").html()) {
				headerHeight = 
					parseInt(currentSection.find("header").height())
					+ parseInt(currentSection.find("header").css("margin-top"))
					+ parseInt(currentSection.find("header").css("margin-bottom"));
					
			} else {
				headerHeight = 0;
			}
			
			totalHeight = bodyHeight - (breadcrumbsHeight + headerHeight + bottomNavHeight);
			currentSection.find(".scrollWrapper").height(totalHeight);
			
			console.log("bodyHeight: " + bodyHeight);
			console.log(currentSection.find(".scroll").height());
			console.log(totalHeight);
			
			if($("body").hasClass("iphone")){
				$(".mainWrapper").height(bodyHeight - breadcrumbsHeight - bottomNavHeight);
			
			} else {
				if($("body").hasClass("landscape")){
					$(".mainWrapper").height("723px");
					
				} else if ($("body").hasClass("portrait")){
					$(".mainWrapper").height("979px");
				}
			}
			
			if(currentSection.find(".scroll").height() > totalHeight){
				currentSection.find(".scroll").attr("scroll", "true");
				
			} else {
				currentSection.find(".scroll").attr("scroll", "");
			}
		},
		
		/* Add to Collections / Email popup message */
		renderPopupMessage:function (_id, _icon) {
			
			
			var model = models.getItem(_id);
            var shouldShowEmailItem = (model.downloadModel === "DownloadableShareable");
			
			
			
			
			if($("body").hasClass("iphone")) {
				var $template = $("#popupalert").tmpl({ id:_id, offsetTop:offsetTop, offsetLeft:offsetLeft });
				$(".assetPopup").remove();
				$template.css({
					"left": "50%",
					"top": "50%",
					"margin-left": "-148px",
					"margin-top": "-80px"
				});
				$template.find("content").css("margin-left", "0");
				$template.prependTo("body");

				if (shouldShowEmailItem != true) {
					$('.email-enabled').hide();
				};
				
			} else {
				var offsetTop = _icon.offset().top + (_icon.height() / 2) - 5,
					offsetLeft = _icon.offset().left + 35,
					$template = $("#popupalert").tmpl({ id:_id, offsetTop:offsetTop, offsetLeft:offsetLeft }),
					id = $template.attr("assetid");
					
				$(".assetPopup").remove();
				$template.css({
					"left": offsetLeft,
					"top": offsetTop
				});
				
				$template.prependTo("body");
				$template.ready(function () {
					if($("section:visible").width() - offsetLeft <  350) {
						$(".assetPopup").attr("direction", "right").css("left", offsetLeft - 80);
						$(".assetPopup").find(".content").css("margin-left", "-222px");
						$(".assetPopup").find("a").first().attr("href", "mfly://control/showAddToCollection?id=" + id + "&x=" + (offsetLeft - 40) + "&y=" + offsetTop + "&w=5&h=20");
					} else {
						$(".assetPopup").attr("direction", "left");
					}
				});
				if (shouldShowEmailItem != true) {
					$('.email-enabled').hide();
				}
			}
		}
	}
}

var emailTimeout;
function showemail() {
	$('.email-share').show();
}