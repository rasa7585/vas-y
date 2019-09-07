// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
Alloy.Globals.homeWin = $.homeWin;

function setInfo() {
	hide();
	//$.picker.setSelectedRow(0,0);
	$.happeningContainer.removeAllChildren();
	var userData;
	try {
		userData = Alloy.Globals.db.execute('SELECT name,email,photo From users WHERE id=?', Ti.App.Properties.getInt("userId"));
		if (userData.fieldByName("photo") == null || userData.fieldByName('photo') == '') {
			$.profileImg.image = "/images/person.png";
		} else {
			$.profileImg.image = userData.fieldByName('photo');
		}

	} catch(e) {
		alert("There is not any thing");
	}

	var data = Alloy.Globals.db.execute('select * from happening where accessibility="pu" order by id desc');
	var dataCount = Alloy.Globals.db.execute('select count(*) as count from happening where accessibility="pu" order by id desc');
	$.todayDesc.text = "Today you have " + dataCount.fieldByName("count") + " Happenings";
	var lastHappening = Alloy.Globals.db.execute("select * from happening where accessibility='pu' order by id desc limit 1");

	while (data.isValidRow()) {
		if (data.fieldByName('id') == lastHappening.fieldByName('id')) {
			// $.container.width = "100%";
			$.happeningContainer.add(Alloy.createController("happeningItem", {
				'id' : data.fieldByName('id'),
				'width':"100%",
				'itemWidth':"98%",
				'innerElements':"98%",
			}).getView());
		} else {
			$.happeningContainer.add(Alloy.createController("happeningItem", {
				'id' : data.fieldByName('id'),
				'width':"50%",
				'innerElements':"95%",
				'itemWidth':"95%",
			}).getView());
		}

		data.next();
	}

}

function loadData() {
	if (Alloy.Globals.updateHome) {
		setInfo();
		Alloy.Globals.updateHome = false;
	}
}

$.homeWin.addEventListener("android:back", function(e) {

});

function addHappening() {
	Alloy.createController("happeningDetails",{'type':'add'}).getView().open();
}

function showPhoto(){
	alert("show Photo");
}

var profilePhoto;
function openGallery() {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions();
	}
	Ti.Media.openPhotoGallery({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
		success : function(e) {

			profilePhoto = e.media;
			$.profileImg.image = profilePhoto;
			Alloy.Globals.db.execute("UPDATE users set photo = ? where id = ?", profilePhoto, Ti.App.Properties.getInt("userId"));
		},
		error : function(e) {
			alert('error');
		}
	});
}

function showMenu(){
	if($.picker.visible == true){
		$.picker.visible = false;
		hide();
	}else{
		$.picker.visible = true;
	$.picker.animate({
		curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
	});
	}
	// alert("Show Menu");
	// $.picker.height = 100;
	
}



function hide() {
	$.picker.visible = false;
	
	$.picker.animate({
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN
	}, function () {
		// $.container.height = Ti.UI.SIZE;
	});

	return;
}

function openProfile(){
	Alloy.createController("userProfile").getView().open();
}

function openSettings(){
	Alloy.createController("settings").getView().open();
}
