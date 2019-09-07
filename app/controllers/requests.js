// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.requestWin.setTitle("MVP Requests");

var label = Ti.UI.createLabel({
	text:"You do nat have any request",
	color:"#aaa",
	font:{
		fontSize:20
	},
	width:Ti.UI.FILL,
	textAlign:"center"
});

var items = [];

function loadRequests() {

	$.section.setItems([]);
	var requests = [];

	var data = Alloy.Globals.db.execute('SELECT DISTINCT * FROM friends WHERE status=0 and (user_one_id =? or user_two_id=?)', Ti.App.Properties.getInt("userId"), Ti.App.Properties.getInt("userId"));

	while (data.isValidRow()) {

		if (data.fieldByName('action_user_id') != Ti.App.Properties.getInt("userId")) {
			if (data.fieldByName('user_one_id') == Ti.App.Properties.getInt("userId")) {
				requests.push(data.fieldByName('user_two_id'));
			} else {
				requests.push(data.fieldByName('user_one_id'));
			}
		}

		data.next();
	}

	for (i in requests) {

		var requestsData = Alloy.Globals.db.execute('SELECT photo, name, id FROM users WHERE id=?', requests[i]);

		items.push({
			itemId : requestsData.fieldByName('id'),
			friendImg : {
				image : requestsData.fieldByName('photo')
			},
			friendName : {
				text : requestsData.fieldByName('name')
			}
		});

	}
	
	if(items.length == 0){
		$.requestWin.remove($.listView);
		$.requestWin.layout = "";
		$.requestWin.add(label);
	}else{
		$.section.items = items;
	}

	
alert("load user");
}

function acceptingRequest(e){
	
	var id = items[e.itemIndex].itemId;

	Alloy.Globals.db.execute('UPDATE friends SET status=1 WHERE action_user_id=? and (user_one_id=? or user_two_id=?) and status=0', id, Ti.App.Properties.getInt("userId"), Ti.App.Properties.getInt("userId"));
	alert('You are now friends');

	e.section.deleteItemsAt(e.itemIndex, 1);
	if(e.section.items.length == 0){
		$.requestWin.remove($.listView);
		$.requestWin.layout = "";
		$.requestWin.add(label);
	}
	// loadRequests();
	// alert();
	
}

function deletingRequest(e){
	
	var id = items[e.itemIndex].itemId;

	Alloy.Globals.db.execute('DELETE FROM friends WHERE action_user_id=? and (user_one_id=? or user_two_id=?) and status=0', id, Ti.App.Properties.getInt("userId"), Ti.App.Properties.getInt("userId"));
	alert('Request is deleted');
	// loadRequests();
	e.section.deleteItemsAt(e.itemIndex, 1);
	if(e.section.items.length == 0){
		$.requestWin.remove($.listView);
		$.requestWin.layout = "";
		$.requestWin.add(label);
	}
	// alert(e.section.items.length);
	// loadRequests();
}
