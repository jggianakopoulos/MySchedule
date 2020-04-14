
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
			var occupied_days = window.ClassCollection.at(i).get("days").split(",");
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
			this.model.set('color', window.color_array[window.current_color]);
			window.current_color++;
			if(window.current_color > 8) {
				window.current_color = 0;
			}
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



window.AvailableClassCollection.add({name:"Intro Cmptr and Prgmng w/Excel",start_time:"17:30",end_time:"19:17",view_start_time:"5:30",view_end_time:"7:17pm",days:"monday,wednesday",subject:"CSI",course_number:"1200",instructor:"Sharan Kalwani",prereq:""});
window.AvailableClassCollection.add({name:"Intro to C Programming & Unix",start_time:"08:00",end_time:"09:07",view_start_time:"8:00",view_end_time:"9:07am",days:"monday,wednesday,friday",subject:"CSI",course_number:"1420",instructor:"Md Atiqul Mollah",prereq:"MTH1554"});
window.AvailableClassCollection.add({name:"Obj-Oriented Computing",start_time:"10:40",end_time:"11:47",view_start_time:"10:40",view_end_time:"11:47am",days:"monday,wednesday,friday",subject:"CSI",course_number:"2300",instructor:"Laura Dinsmooor",prereq:"CSI1300, CSI1310"});
window.AvailableClassCollection.add({name:"Data Structures",start_time:"10:00",end_time:"11:47",view_start_time:"10:00",view_end_time:"11:47am",days:"tuesday,thursday",subject:"CSI",course_number:"2310",instructor:"Julian Rrushi",prereq:"CIT230 or CSE230 or CSI2300"});
window.AvailableClassCollection.add({name:"Intro to Computer Network",start_time:"15:00",end_time:"16:47",view_start_time:"3:00",view_end_time:"4:47pm",days:"monday,wednesday",subject:"CSI",course_number:"2470",instructor:"Md Atiqul Mollah",prereq:"CIT230 or CSE230"});
window.AvailableClassCollection.add({name:"Sophomore Project",start_time:"10:00",end_time:"11:47",view_start_time:"10:00",view_end_time:"11:47am",days:"wednesday",subject:"CSI",course_number:"2999",instructor:"Jingshu Chen",prereq:"CIT230 or CSE230 or CSI2300"});
window.AvailableClassCollection.add({name:"Programming Languages",start_time:"17:30",end_time:"19:17",view_start_time:"5:30",view_end_time:"7:17pm",days:"monday,wednesday",subject:"CSI",course_number:"3350",instructor:"",prereq:"CSI2310, MTH2775"});
window.AvailableClassCollection.add({name:"Software Engineer and Practice",start_time:"13:00",end_time:"14:47",view_start_time:"1:00",view_end_time:"2:47pm",days:"tuesday,thursday",subject:"CSI",course_number:"3370",instructor:"Leon Brooks",prereq:""});
window.AvailableClassCollection.add({name:"Theory of Computation",start_time:"15:30",end_time:"17:17",view_start_time:"3:30",view_end_time:"5:17pm",days:"monday,wednesday",subject:"CSI",course_number:"3430",instructor:"Mohammad Mehdi",prereq:""});
window.AvailableClassCollection.add({name:"Database Design and Implemen",start_time:"10:00",end_time:"11:47",view_start_time:"10:00",view_end_time:"11:47am",days:"tuesday,thursday",subject:"CSI",course_number:"3450",instructor:"Amartya Sen",prereq:""});
window.AvailableClassCollection.add({name:"Human Computer Interaction",start_time:"13:00",end_time:"14:47",view_start_time:"1:00",view_end_time:"2:47pm",days:"tuesday,thursday",subject:"CSI",course_number:"3500",instructor:"Douglas Zytko",prereq:""});
window.AvailableClassCollection.add({name:"Design and Analys of Algorithm",start_time:"15:00",end_time:"16:47",view_start_time:"3:00",view_end_time:"4:47pm",days:"tuesday,thursday",subject:"CSI",course_number:"3610",instructor:"Serge Kruk",prereq:"APM2663, CSI2310"});
window.AvailableClassCollection.add({name:"Computer Organization",start_time:"08:00",end_time:"11:20",view_start_time:"8:00",view_end_time:"11:20am",days:"friday",subject:"CSI",course_number:"2610",instructor:"Debatosh Debnath",prereq:"CSI2290 or CSI 2310"});
window.AvailableClassCollection.add({name:"System Administration",start_time:"13:00",end_time:"14:47",view_start_time:"1:00",view_end_time:"2:47pm",days:"monday,wednesday",subject:"CSI",course_number:"3660",instructor:"Erik Fredericks",prereq:"CIT247 or CSE247 or CSI2470"});
window.AvailableClassCollection.add({name:"Script Programming",start_time:"10:00",end_time:"11:47",view_start_time:"10:00",view_end_time:"11:47am",days:"tuesday,thursday",subject:"CSI",course_number:"3680",instructor:"Jingshu Chen",prereq:"CSI3660"});
window.AvailableClassCollection.add({name:"Information Security Practice",start_time:"15:00",end_time:"16:47",view_start_time:"3:00",view_end_time:"4:47pm",days:"tuesday,thursday",subject:"CSI",course_number:"4480",instructor:"Anyi Liu",prereq:"CIT247 or CSE247 or CSI2470"});
window.AvailableClassCollection.add({name:"Discrete Mathematics",start_time:"13:00",end_time:"14:47",view_start_time:"1:00",view_end_time:"2:47pm",days:"tuesday,thursday",subject:"APM",course_number:"2663",instructor:"Eddie Cheng",prereq:"MTH1555"});
window.AvailableClassCollection.add({name:"Calculus 1",start_time:"09:20",end_time:"10:27",view_start_time:"9:20",view_end_time:"10:27am",days:"monday,wednesday,friday",subject:"MTH",course_number:"1554",instructor:"",prereq:"MTH1441 or MTH1331"});
window.AvailableClassCollection.add({name:"Calculus 2",start_time:"10:40",end_time:"11:47",view_start_time:"10:40",view_end_time:"11:47am",days:"monday,wednesday,friday",subject:"MTH",course_number:"1555",instructor:"Tamas Horvath",prereq:"MTH1554"});
window.AvailableClassCollection.add({name:"Calculus 2",start_time:"10:40",end_time:"11:47",view_start_time:"10:40",view_end_time:"11:47am",days:"monday,wednesday,friday",subject:"MTH",course_number:"1555",instructor:"Tamas Horvath",prereq:"MTH1554"});
window.AvailableClassCollection.add({name:"Elementary Algebra",start_time:"08:00",end_time:"09:35",view_start_time:"8:00",view_end_time:"9:35am",days:"monday,wednesday",subject:"MTH",course_number:"0661",instructor:"Jane Mullally",prereq:""});
window.AvailableClassCollection.add({name:"Elementary Algebra",start_time:"09:45",end_time:"11:20",view_start_time:"9:45",view_end_time:"11:20am",days:"tuesday,thursday",subject:"MTH",course_number:"0661",instructor:"Sherri Zimmerman",prereq:""});
window.AvailableClassCollection.add({name:"Intermediate Algebra",start_time:"09:45",end_time:"11:20",view_start_time:"9:45",view_end_time:"11:20am",days:"monday,wednesday",subject:"MTH",course_number:"0662",instructor:"Robert Connolly",prereq:"MTH0662"});
window.AvailableClassCollection.add({name:"Intermediate Algebra",start_time:"09:00",end_time:"10:07",view_start_time:"9:00",view_end_time:"10:07am",days:"tuesday,thursday",subject:"MTH",course_number:"0662",instructor:"Ervisa Zhamo",prereq:"MTH0662"});
window.AvailableClassCollection.add({name:"Intermediate Algebra",start_time:"09:00",end_time:"10:07",view_start_time:"9:00",view_end_time:"10:07am",days:"monday,tuesday,thursday,friday",subject:"MTH",course_number:"0662",instructor:"Thomas VanHouten",prereq:"MTH0662"});
window.AvailableClassCollection.add({name:"Precalculus",start_time:"12:00",end_time:"13:35",view_start_time:"12:00pm",view_end_time:"1:35pm",days:"monday,tuesday,wednesday,thursday",subject:"MTH",course_number:"1441",instructor:"Robert Connolly",prereq:"MTH1441"});










window.VisibleAvailableClassCollection = window.AvailableClassCollection;
