// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var userId = Ti.App.Properties.getInt("userId");

function setInfo(){
	var userData = Alloy.Globals.db.execute("SELECT * FROM users WHERE id = ?", userId);
	while(userData.isValidRow()){
		
		if (userData.fieldByName("photo") == null || userData.fieldByName('photo') == '') {
			$.profileImg.image = "/images/person.png";
		} else {
			$.profileImg.image = userData.fieldByName('photo');
		}
		$.title.text = userData.fieldByName("name");
		$.todayTask.text = "Today you have 9 tasks";
		userData.next();
	}
}

setInfo();



var screenWidth = 322;
var needToChangeSize = false;

var screenWidthActual = Ti.Platform.displayCaps.platformWidth;

if (Ti.Platform.osname === 'android') {
	if (screenWidthActual >= 641) {
		screenWidth = screenWidthActual;
		needToChangeSize = true;
	}
}

// Main Window of the Month View.

// Button at the buttom side
var backButton = Ti.UI.createButton({
	bottom : '20dp',
	height : '40dp',
	width : '200dp',
});



// Tool Bar - Day's


$.toolBarDays.sunday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sun',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.monday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Mon',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.tuesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Tue',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.wednesday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Wed',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.thursday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Thu',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.friday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Fri',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
});

$.toolBarDays.saturday = Ti.UI.createLabel({
	left : '0dp',
	height : '20dp',
	text : 'Sat',
	width : '46dp',
	textAlign : 'center',
	font : {
		fontSize : 12,
		fontWeight : 'bold'
	},
	color : '#3a4756'
	// color:"green"
	
	
});

$.toolBarDays.add($.toolBarDays.sunday);
$.toolBarDays.add($.toolBarDays.monday);
$.toolBarDays.add($.toolBarDays.tuesday);
$.toolBarDays.add($.toolBarDays.wednesday);
$.toolBarDays.add($.toolBarDays.thursday);
$.toolBarDays.add($.toolBarDays.friday);
$.toolBarDays.add($.toolBarDays.saturday);


// Function which create day view template
dayView = function(e) {
	var label = Ti.UI.createLabel({
		current : e.current,
		width : '46dp',
		height : '44dp',
		// backgroundColor : '#FFDCDCDF',
		backgroundColor:'green',
		text : e.day,
		textAlign : 'center',
		color : e.color,
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
	});
	return label;
};

monthName = function(e) {
	switch(e) {
	case 0:
		e = 'January';
		break;
	case 1:
		e = 'February';
		break;
	case 2:
		e = 'March';
		break;
	case 3:
		e = 'April';
		break;
	case 4:
		e = 'May';
		break;
	case 5:
		e = 'June';
		break;
	case 6:
		e = 'July';
		break;
	case 7:
		e = 'August';
		break;
	case 8:
		e = 'September';
		break;
	case 9:
		e = 'October';
		break;
	case 10:
		e = 'November';
		break;
	case 11:
		e = 'December';
		break;
	};
	return e;
};

// Calendar Main Function
var calView = function(a, b, c) {
	var nameOfMonth = monthName(b);

	//create main calendar view
	var mainView = Ti.UI.createView({
		layout : 'horizontal',
		width : '322dp',
		height : 'auto',
		top : 200
	});

	//set the time
	var daysInMonth = 32 - new Date(a, b, 32).getDate();
	var dayOfMonth = new Date(a, b, c).getDate();
	var dayOfWeek = new Date(a, b, 1).getDay();
	var daysInLastMonth = 32 - new Date(a, b - 1, 32).getDate();
	var daysInNextMonth = (new Date(a, b, daysInMonth).getDay()) - 6;

	//set initial day number
	var dayNumber = daysInLastMonth - dayOfWeek + 1;

	//get last month's days
	for ( i = 0; i < dayOfWeek; i++) {
		mainView.add(new dayView({
			day : dayNumber,
			color : '#8e959f',
			current : 'no',
			dayOfMonth : '',
		}));
		dayNumber++;
	};

	// reset day number for current month
	dayNumber = 1;

	//get this month's days
	for ( i = 0; i < daysInMonth; i++) {
		var newDay = new dayView({
			day : dayNumber,
			color : '#3a4756',
			current : 'yes',
			dayOfMonth : dayOfMonth
		});
		mainView.add(newDay);
		if (newDay.text == dayOfMonth) {
			newDay.color = 'white';
			// newDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
			newDay.backgroundColor = '#FFFFF000';
			var oldDay = newDay;
		}
		dayNumber++;
	};
	dayNumber = 1;

	//get remaining month's days
	for ( i = 0; i > daysInNextMonth; i--) {
		mainView.add(new dayView({
			day : dayNumber,
			color : '#8e959f',
			current : 'no',
			dayOfMonth : ''
		}));
		dayNumber++;
	};

	// this is the new "clicker" function, although it doesn't have a name anymore, it just is.
	mainView.addEventListener('click', function(e) {
		if (e.source.current == 'yes') {

			// reset last day selected
			if (oldDay.text == dayOfMonth) {
				oldDay.color = 'white';
				// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday.png';
				oldDay.backgroundColor = '#FFFFF000';
			} else {
				oldDay.color = '#3a4756';
				// oldDay.backgroundImage='../libraries/calendar/pngs/monthdaytile-Decoded.png';
				oldDay.backgroundColor = '#FFDCDCDF';
			}
			oldDay.backgroundPaddingLeft = '0dp';
			oldDay.backgroundPaddingBottom = '0dp';

			// set window title with day selected, for testing purposes only
			backButton.title = nameOfMonth + ' ' + e.source.text + ', ' + a;

			// set characteristic of the day selected
			if (e.source.text == dayOfMonth) {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytiletoday_selected.png';
				e.source.backgroundColor = '#FFFF00FF';
			} else {
				// e.source.backgroundImage='../libraries/calendar/pngs/monthdaytile_selected.png';
				e.source.backgroundColor = '#FFFF0000';
			}
			e.source.backgroundPaddingLeft = '1dp';
			e.source.backgroundPaddingBottom = '1dp';
			e.source.color = 'white';
			//this day becomes old :(
			oldDay = e.source;
		}
	});

	return mainView;
};

// what's today's date?
var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth();
c = setDate.getDate();

// add the three calendar views to the window for changing calendars with animation later

var prevCalendarView = null;
if (b == 0) {
	prevCalendarView = calView(a - 1, 11, c);
} else {
	prevCalendarView = calView(a, b - 1, c);
}
prevCalendarView.left = (screenWidth * -1) + 'dp';

var nextCalendarView = null;
if (b == 0) {
	nextCalendarView = calView(a + 1, 0, c);
} else {
	nextCalendarView = calView(a, b + 1, c);
}
nextCalendarView.left = screenWidth + 'dp';

var thisCalendarView = calView(a, b, c);
if (needToChangeSize == false) {
	thisCalendarView.left = '-1dp';
}

$.monthTitle.text = monthName(b) + ' ' + a;

backButton.title = monthName(b) + ' ' + c + ', ' + a;

// add everything to the window
// $.calendar.add(toolBar);
$.calendar.add(thisCalendarView);
$.calendar.add(nextCalendarView);
$.calendar.add(prevCalendarView);
$.calendar.add(backButton);

// yeah, open the window, why not?
$.calendar.open({
	modal : true
});

var slideNext = Titanium.UI.createAnimation({
	// left : '-322',
	duration : 500
});

slideNext.left = (screenWidth * -1);

var slideReset = Titanium.UI.createAnimation({
	// left : '-1',
	duration : 500
});

if (needToChangeSize == false) {
	slideReset.left = '-1';
} else {
	slideReset.left = ((screenWidth - 644) / 2);
}

var slidePrev = Titanium.UI.createAnimation({
	// left : '322',
	duration : 500
});

slidePrev.left = screenWidth;






