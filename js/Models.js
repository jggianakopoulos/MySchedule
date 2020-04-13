
var AvailableClassView = Backbone.View.extend ({
	template: _.template($("#availableclassview").html()),
	class:"AvailableClassView",
	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	initialize : function() {
		this.render();
	},
	"events" : {
		"click" : "askAdd"
	},
	"askAdd" : function () {
		console.log("askadd");
		days = this.model.get("days");
		popup = true;
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
				if (this.model.get("start_time") < e_end_time && this.model.get("end_time") > e_start_time) {
					popup = false;
					break;
				}
			}
		}

		if (popup) {
			window.current_model = this.model;
			if (this.model.get("prereq") && this.model.get("prereq") != "") {
				$("#add-popup-text").html("WARNING: You cannot take " + this.model.get("name") + " if you have not taken the following classes: " + this.model.get("prereq") + ". Do you still wish to add the class to your schedule?");
			} else {
				$("#add-popup-text").html("Are you sure you want to add " + this.model.get("name") + " to your schedule?");
			}
			$(".add-popup").removeClass("invisible");
		} else {
			$("#error-popup-text").html("This class doesn't fit into your schedule.");
			$(".error-popup").removeClass("invisible");
			setTimeout(function() {
				$(".error-popup").addClass("invisible"); 
			}, 2000);
		}
	}
});

var AvailableClassViewHolder = Backbone.View.extend({
	template: _.template($("#availableclassviewholder").html()),
	render: function () {
		this.$el.html(this.template());
		$collectionHolder = document.createElement("div");
		_.each(window.AvailableClassCollection.models, function(model) {
			var avclass = new AvailableClassView({
				model: model
			});

			$collectionHolder.append(avclass.render().el);
		}.bind(this));

		$("#collection_holder").html($collectionHolder);
		return this;
	},
	initialize: function() {
		// _.bindAll(this.render);
		this.render();
	},
	"events" : {
		"keyup #name_filter" : "resetCollection",
		"keyup #subject_filter" : "resetCollection",
		"keyup #course_number_filter" : "resetCollection"
	},
	resetCollection : function(e) {
		console.log("reset collection");
		
		$("#collection_holder").html("");
		var name_filter = $("#name_filter").val().toLowerCase();
		var subject_filter = $("#subject_filter").val().toLowerCase();
		var course_number_filter = $("#course_number_filter").val().toLowerCase();

		$collectionHolder = document.createElement("div");
		_.each(window.AvailableClassCollection.models, function (model) {
			if ((model.get("name").toLowerCase().includes(name_filter) || name_filter =="") && (model.get("subject").toLowerCase().includes(subject_filter) || subject_filter == "") && (model.get("course_number").toLowerCase().includes(course_number_filter) || course_number_filter == "")) {
				var avclass = new AvailableClassView({
					model: model
				})

				$collectionHolder.append(avclass.render().el);
				window.VisibleAvailableClassCollection.add(model);
			}
		}.bind(this));

		$("#collection_holder").html($collectionHolder);
	}
});


var ScheduledClassView = Backbone.View.extend ({
	template: _.template($("#scheduledclassview").html()),
	class:"AvailableClassView",
	render: function () {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	initialize : function() {
		this.render();
	},
	"events" : {
		"click" : "askRemove"
	},
	"askRemove" : function () {
		window.remove_model = this.model;
		$("#remove-popup-text").html("Are you sure you want to remove " + this.model.get("name") + " from your schedule?");
		$(".remove-popup").removeClass("invisible");
	}
});


ClassModel = Backbone.Model.extend ({
	initialize : function () {
	},
	defaults : {
		days : "monday;wednesday",
		start_time: "3:00",
		end_time: "5:00"
	},
	comparator: 'start_time'

});

AvailableClassModel = Backbone.Model.extend({
	
});

ClassCollection = Backbone.Collection.extend({
	model: ClassModel
});

AvailableClassCollection = Backbone.Collection.extend({
	model: ClassModel
});

VisibleAvailableClassCollection = Backbone.Collection.extend({
	model: ClassModel
});

MondayClassCollection = Backbone.Collection.extend({
	model: ClassModel,
	comparator: function (model) {
		return model.get("start_time");
	}
});

TuesdayClassCollection = Backbone.Collection.extend({
	model: ClassModel,
	comparator: function (model) {
		return model.get("start_time");
	}
});
WednesdayClassCollection = Backbone.Collection.extend({
	model: ClassModel,
	comparator: function (model) {
		return model.get("start_time");
	}
});
ThursdayClassCollection = Backbone.Collection.extend({
	model: ClassModel,
	comparator: function (model) {
		return model.get("start_time");
	}
});
FridayClassCollection = Backbone.Collection.extend({
	model: ClassModel,
	comparator: function (model) {
		return model.get("start_time");
	}
});
window.ClassCollection = new ClassCollection();
window.AvailableClassCollection = new AvailableClassCollection();
window.MondayClassCollection = new MondayClassCollection();
window.TuesdayClassCollection = new TuesdayClassCollection();
window.WednesdayClassCollection = new WednesdayClassCollection();
window.ThursdayClassCollection = new ThursdayClassCollection();
window.FridayClassCollection = new FridayClassCollection();


window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",view_start_time:"5:00",view_end_time:"7:00pm",days:"monday,wednesday", subject:"APM",course_number:"2200",instructor:"Jon Jones",prereq:"APM1000"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",view_start_time:"4:00",view_end_time:"7:00pm",days:"tuesday,thursday",subject:"PHY",course_number:"2400",instructor:"Kevin Brown"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",view_start_time:"3:00",view_end_time:"4:00pm",days:"monday,wednesday,friday",subject:"IS",course_number:"1600",instructor:"Lee Card"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",view_start_time:"9:00",view_end_time:"11:47am",days:"friday",subject:"CS",course_number:"3500",instructor:"Dave Smith",prereq:"CS3480, CS3300, CS2200"});





window.VisibleAvailableClassCollection = window.AvailableClassCollection;