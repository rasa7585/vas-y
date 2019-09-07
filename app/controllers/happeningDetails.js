// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var happeningId = $.args.id;
var type = $.args.type;
if(type == 'add'){
	$.participantIcon.color = "#aaa";
	$.participantLabel.color = "#aaa";
	
	$.walletIcon.color = "#aaa";
	$.walletLabel.color = "#aaa";
	
	$.calendarIcon.color = "#aaa";
	$.calendarLabel.color = "#aaa";
	
	$.taskIcon.color = "#aaa";
	$.taskLabel.color = "#aaa";
}
var views = [
Alloy.createController("about",{
	'id': happeningId,
	'type':type,
}).getView(),
Alloy.createController("allUsers",{
	'id': happeningId
}).getView(),
Alloy.createController("walletPage").getView(),
Alloy.createController("calendar",{
	'id':happeningId
}).getView(),
Alloy.createController("tasks",{
	'id':happeningId
}).getView(),
];

$.scrollableView.views = views;

function goToDetails(){
	$.scrollableView.scrollToView(0);
}

function goToUsers(){
	if(type == 'details'){
		$.scrollableView.scrollToView(1);
	}
	
}

function goToWallet(){
	if(type == 'details'){
		$.scrollableView.scrollToView(2);
	}
	
}

function goToCalendar(){
	if(type == 'details'){
		$.scrollableView.scrollToView(3);
	}
	
}

function goToTasks(){
	if(type == 'details'){
		$.scrollableView.scrollToView(4);
	}
	
}
