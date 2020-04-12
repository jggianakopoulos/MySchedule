
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
			$(".add-popup").removeClass("invisible");
		} else {
			$(".error-popup").removeClass("invisible");
			setTimeout(function() {
				$(".error-popup").addClass("invisible"); 
			}, 1500);
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
	model: ClassModel
});

TuesdayClassCollection = Backbone.Collection.extend({
	model: ClassModel
});
WednesdayClassCollection = Backbone.Collection.extend({
	model: ClassModel
});
ThursdayClassCollection = Backbone.Collection.extend({
	model: ClassModel
});
FridayClassCollection = Backbone.Collection.extend({
	model: ClassModel
});
window.ClassCollection = new ClassCollection();
window.AvailableClassCollection = new AvailableClassCollection();
window.MondayClassCollection = new MondayClassCollection();
window.TuesdayClassCollection = new TuesdayClassCollection();
window.WednesdayClassCollection = new WednesdayClassCollection();
window.ThursdayClassCollection = new ThursdayClassCollection();
window.FridayClassCollection = new FridayClassCollection();


window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",days:"monday", subject:"APM",course_number:"1500"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",days:"tuesday",subject:"PHY",course_number:"2400"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",days:"monday",subject:"IS",course_number:"1600"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",days:"friday",subject:"CS",course_number:"3500"});
window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",days:"monday", subject:"APM",course_number:"1500"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",days:"tuesday",subject:"PHY",course_number:"2400"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",days:"monday",subject:"IS",course_number:"1600"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",days:"friday",subject:"CS",course_number:"3500"});
window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",days:"monday", subject:"APM",course_number:"1500"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",days:"tuesday",subject:"PHY",course_number:"2400"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",days:"monday",subject:"IS",course_number:"1600"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",days:"friday",subject:"CS",course_number:"3500"});
window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",days:"monday", subject:"APM",course_number:"1500"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",days:"tuesday",subject:"PHY",course_number:"2400"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",days:"monday",subject:"IS",course_number:"1600"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",days:"friday",subject:"CS",course_number:"3500"});
window.AvailableClassCollection.add({name:"Class 1",start_time:"17:00",end_time:"19:00",days:"monday", subject:"APM",course_number:"1500"});
window.AvailableClassCollection.add({name:"Class 2",start_time:"16:00",end_time:"19:00",days:"tuesday",subject:"PHY",course_number:"2400"});
window.AvailableClassCollection.add({name:"Class 3",start_time:"15:00",end_time:"16:00",days:"monday",subject:"IS",course_number:"1600"});
window.AvailableClassCollection.add({name:"Class 4",start_time:"09:00",end_time:"11:47",days:"monday;friday",subject:"CS",course_number:"3500"});




window.VisibleAvailableClassCollection = window.AvailableClassCollection;