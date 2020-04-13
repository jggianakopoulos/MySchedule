$( document ).ready(function() {
	new AvailableClassViewHolder({el:$(".acvh")});

	var redrawMonday = function() {
		$(".monday").html("");
		_.each(window.MondayClassCollection.sort().models, function (model) {
			var adding = new ScheduledClassView({
				model : model
			});
			$(".monday").append(adding.render().el);
		});

	};
	var redrawTuesday = function() {
		$(".tuesday").html("");
		_.each(window.TuesdayClassCollection.models, function (model) {
			var adding = new ScheduledClassView({
				model : model
			});
			$(".tuesday").append(adding.render().el);
		});

	};
	var redrawWednesday = function() {
		$(".wednesday").html("");
		_.each(window.WednesdayClassCollection.models, function (model) {
			var adding = new ScheduledClassView({
				model : model
			});
			$(".wednesday").append(adding.render().el);
		});

	};
	var redrawThursday = function() {
		$(".thursday").html("");
		_.each(window.ThursdayClassCollection.models, function (model) {
			var adding = new ScheduledClassView({
				model : model
			});
			$(".thursday").append(adding.render().el);
		});

	};
	var redrawFriday = function() {
		$(".friday").html("");
		_.each(window.FridayClassCollection.models, function (model) {
			var adding = new ScheduledClassView({
				model : model
			});
			$(".friday").append(adding.render().el);
		});

	};

  	var addEvent = function() {
		var days = "";
		var name = $("#event_name").val();
		var start_time = $("#start_time").val();
		var end_time = $("#end_time").val();

		for(var i = 0; i< $("input[name='days']:checked").length; i++) {
			if (days == "") {
				days += $("input[name='days']:checked")[i].value;
			} else {
				days += ";" + $("input[name='days']:checked")[i].value;
			}
		}

		if(name != "" && start_time != "" && end_time != "" && days != "") {
			if (start_time >= end_time) {
				$("#error-popup-text").html("The end time cannot be before the start time.");
				$(".error-popup").removeClass("invisible");
				setTimeout(function() {
					$(".error-popup").addClass("invisible"); 
				}, 2000);
			} else {
				var overlap = false;
				var add = true;

				for(var i = 0; i < window.ClassCollection.length; i++) {
					overlap = false;
					var occupied_days = window.ClassCollection.at(i).get("days").split(";");
					for(var j = 0; j < occupied_days.length; j++) {
						if (days.includes(occupied_days[j])) {
							overlap = true;
							break;
						}
					}

					if (overlap) {
						e_start_time = window.ClassCollection.at(i).get("start_time");
						e_end_time = window.ClassCollection.at(i).get("end_time");
						if (start_time < e_end_time && end_time > e_start_time) {
							add = false;
							break;
						}
					}
				}

				if (add) {
					var start_number = parseInt(start_time.substring(0,2));
					var end_number = parseInt(end_time.substring(0,2));

					if (start_number > 12) {
						start_number = start_number - 12;
					} else if(start_number == 0) {
						start_number = 12;
					}

					var tod = "am";
					if (end_number > 12) {
						end_number = end_number - 12;
						tod = "pm";
					} else if(end_number == 0) {
						end_number = 12;
					}

					view_start_time = start_number.toString() + start_time.substring(2,5);
					view_end_time = end_number.toString() + end_time.substring(2,5) + tod;

					new_model = new ClassModel({name: name,start_time:start_time,end_time:end_time,days:days,view_start_time:view_start_time,view_end_time:view_end_time});
					if (days.includes("monday")) {
						window.MondayClassCollection.add(new_model);
						redrawMonday();
					}
					if (days.includes("tuesday")) {
						window.TuesdayClassCollection.add(new_model);
						redrawTuesday();
					}
					if (days.includes("wednesday")) {
						window.WednesdayClassCollection.add(new_model);
						redrawWednesday();
					}
					if (days.includes("thursday")) {
						window.ThursdayClassCollection.add(new_model);
						redrawThursday();
					}
					if (days.includes("friday")) {
						window.FridayClassCollection.add(new_model);
						redrawFriday();
					}
					window.ClassCollection.add(new_model);
				} else {
					$("#error-popup-text").html("This class doesn't fit in your schedule.");
					$(".error-popup").removeClass("invisible");
					setTimeout(function() {
						$(".error-popup").addClass("invisible"); 
					}, 2000);
				}
			}

		} else {
			$("#error-popup-text").html("You must fill in every field.");
			$(".error-popup").removeClass("invisible");
			setTimeout(function() {
				$(".error-popup").addClass("invisible"); 
			}, 2000);
		}
	};

	var addClass = function() {
		if (window.current_model) {
			console.log("this is here");
			window.ClassCollection.add(window.current_model);
			if (current_model.get("days").includes("monday")) {
				window.MondayClassCollection.add(window.current_model);
				redrawMonday();
			}
			if (current_model.get("days").includes("tuesday")) {
				window.TuesdayClassCollection.add(window.current_model);
				redrawTuesday();
			}
			if (current_model.get("days").includes("wednesday")) {
				window.WednesdayClassCollection.add(window.current_model);
				redrawWednesday();
			}
			if (current_model.get("days").includes("thursday")) {
				window.ThursdayClassCollection.add(window.current_model);
				redrawThursday();
			}
			if (current_model.get("days").includes("friday")) {
				window.FridayClassCollection.add(window.current_model);
				redrawFriday();
			}
			window.current_model = null;
		} else {
			console.log("current model not defined");
		}
		$(".add-popup").addClass("invisible");
	};

	var removeClass = function() {
		if (window.remove_model) {
			console.log("this is here");
			window.ClassCollection.remove(window.remove_model);
			if (remove_model.get("days").includes("monday")) {
				window.MondayClassCollection.remove(window.remove_model);
				redrawMonday();
			}
			if (remove_model.get("days").includes("tuesday")) {
				window.TuesdayClassCollection.remove(window.remove_model);
				redrawTuesday();
			}
			if (remove_model.get("days").includes("wednesday")) {
				window.WednesdayClassCollection.remove(window.remove_model);
				redrawWednesday();
			}
			if (remove_model.get("days").includes("thursday")) {
				window.ThursdayClassCollection.remove(window.remove_model);
				redrawThursday();
			}
			if (remove_model.get("days").includes("friday")) {
				window.FridayClassCollection.remove(window.remove_model);
				redrawFriday();
			}
			window.remove_model = null;
		} else {
			console.log("remove model not defined");
		}
		$(".remove-popup").addClass("invisible");
	};

	$("#add_my_event").on("click", addEvent);
	$("#add-class").on("click", addClass);
	$("#remove-class").on("click", removeClass);
	$(".add-nevermind").on("click", function() {
		$(".add-popup").addClass("invisible");
	});
	$(".remove-nevermind").on("click", function() {
		$(".remove-popup").addClass("invisible");
	});
});