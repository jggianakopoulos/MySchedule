$( document ).ready(function() {
	new AvailableClassViewHolder({el:$(".acvh")});

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
				console.log("Start time is greater than end time");
			} else {
				var overlap = false;
				var add = true;

				for(var i = 0; i < window.ClassCollection.length; i++) {
					overlap = false;
					var occupied_days = window.ClassCollection.at(i).get("days").split(";");
					for(var j = 0; j < occupied_days.length; j++) {
						console.log("days " + days);
						console.log(occupied_days[j]);
						if (days.includes(occupied_days[j])) {
							overlap = true;
							break;
						}
					}

					if (overlap) {
						e_start_time = window.ClassCollection.at(i).get("start_time");
						e_end_time = window.ClassCollection.at(i).get("end_time");
						if (start_time < e_end_time && end_time > e_start_time) {
							console.log([start_time, end_time, e_start_time, e_end_time]);
							add = false;
							break;
						}
					}
				}

				if (add) {
					window.ClassCollection.add({name: name,start_time:start_time,end_time:end_time,days:days});
					console.log(window.ClassCollection);
				} else {
					console.log("you cant add this one.");
				}

			}

		}
	};

	// var filterClasses = function() {
	// 	console.log("filter classes");
	// 	var name_filter = $("#name_filter").val();
	// 	var subject_filter = $("#subject_filter").val();
	// 	var course_number_filter = $("#course_number_filter").val();
	// 	window.VisibleAvailableClassCollection.reset();

	// 	if (name_filter = )

	// 	_.each(window.AvailableClassCollection.models, function (model) {
	// 		if ((model.get("name").includes(name_filter) || name_filter =="") && (model.get("subject").includes(subject_filter) || subject_filter == "") && (model.get("course_number").includes(course_number_filter) || course_number_filter == "")) {
				
	// 			window.VisibleAvailableClassCollection.add(model);
	// 		}
	// 	}.bind(this));
	// }

	// filterClasses();

	// $(".fil").on("click", filterClasses);

	$("#add_my_event").on("click", addEvent);
});