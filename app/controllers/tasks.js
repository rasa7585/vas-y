// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
	var userData = Alloy.Globals.db.execute('SELECT name,email,photo From users WHERE id=?', Ti.App.Properties.getInt("userId"));
	try {
		if (userData.fieldByName("photo") == null || userData.fieldByName('photo') == '') {
			$.profileImg.image = "/images/person.png";
		} else {
			$.profileImg.image = userData.fieldByName('photo');
		}
		$.title.text = "Hello" + userData.fieldByName("name");
		$.todayDesc.text = "Today you have 9 tasks";
	} catch(e) {
		alert("There is not any thing");
	}
	
var taskArray = [];
var tasks = Alloy.Globals.db.execute("SELECT * FROM tasks WHERE happening_id = ?", Ti.App.Properties.getInt("happening_id"));
while(tasks.isValidRow()){
	taskArray.push({
		taskLabel:{
			text:tasks.fieldByName("name"),
		}
	});
	tasks.next();
	$.taskItems.items = taskArray;
}
