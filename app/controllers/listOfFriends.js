// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.friendWin.setTitle("MVP Friends");
var label = Ti.UI.createLabel({
	text:"You still do not have any friend",
	color:"#aaa",
	font:{
		fontSize:20
	},
	width:Ti.UI.FILL,
	textAlign:"center"
});

var items = [];

function showListOfUsers(){
	Alloy.createController("allUsers").getView().open();
}

function loadFriends(){
	
	$.section.setItems([]);
	var friends = [];
	
	var data = Alloy.Globals.db.execute('SELECT DISTINCT * FROM friends WHERE status=1 and (user_one_id =? or user_two_id=?)', Ti.App.Properties.getInt("userId"), Ti.App.Properties.getInt("userId"));
	
	while(data.isValidRow()){
		
		if(data.fieldByName('user_one_id') == Ti.App.Properties.getInt("userId")){
			friends.push(data.fieldByName('user_two_id'));
		}else{
			friends.push(data.fieldByName('user_one_id'));
		}
		
		data.next();
	}
	
	for(i in friends){
		
		var friendData = Alloy.Globals.db.execute('SELECT photo, name, id FROM users WHERE id=?', friends[i]);
		
		items.push({
			itemId: friendData.fieldByName('id'),
			friendImg: {
				image: friendData.fieldByName('photo') 
			},
			friendName: {
				text: friendData.fieldByName('name')
			}
		});
		
	}
	
	
	if(items.length == 0){
		$.friendWin.remove($.listView);
		$.friendWin.layout="";
		$.friendWin.add(label);
	}else{
		$.section.items = items;
	}
	
	
}

function unfriendBtn(e){
	
	var id = items[e.itemIndex].itemId;
	
	Alloy.Globals.db.execute('DELETE FROM friends WHERE user_one_id=? or user_two_id=?', id, id);
	alert('Now you are not friends');
	
	e.section.deleteItemsAt(e.itemIndex, 1);
		if(e.section.items.length == 0){
		$.friendWin.remove($.listView);
		$.friendWin.layout = "";
		$.friendWin.add(label);
	}
}



 $.friendWin.addEventListener("open", function(e){
 	var activity = $.friendWin.activity;
 	activity.onCreateOptionsMenu = function(e){
 		var menu = e.menu;
 		var showUsers = menu.add({
 			icon:"/images/plus.png",
 			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
 		});
 		
 		showUsers.addEventListener("click", function(e){
 			showListOfUsers();
 		});
 	};
 });
