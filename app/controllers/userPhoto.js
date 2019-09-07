// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var userInfo = Alloy.Globals.db.execute("SELECT * FROM users WHERE id = ?", Ti.App.Properties.getInt("userId"));

function showPhoto() {
	// if(userInfo.fieldByName("photo") != null || userInfo.fieldByName("photo") != ""){
		 $.userPhoto.image = userInfo.fieldByName("photo");
	// }

}

showPhoto();

