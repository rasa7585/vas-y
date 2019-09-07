// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// var photo;
// var id = $.args.id;
// var happeningInfo = Alloy.Globals.db.execute("SELECT * FROM happening WHERE id = ?", id);
//
// $.locationLabel.text = happeningInfo.fieldByName("location");
// $.budgetLabel.text = "Budget: " + happeningInfo.fieldByName("budget");
// $.details.text = happeningInfo.fieldByName("details");
// $.title.text = happeningInfo.fieldByName("name");
// $.dateLabel.text = happeningInfo.fieldByName("created_date");
//
// var users = Alloy.Globals.db.execute("SELECT * FROM participants WHERE happening_id = ? limit 3", id);
// while(users.isValidRow()){
// var userInfo = Alloy.Globals.db.execute("SELECT * FROM users WHERE id = ?", users.fieldByName("user_id"));
// if(userInfo.fieldByName("photo") == "" || userInfo.fieldByName("photo") == null){
// photo = "/images/photos/pic.jpg";
// }else{
// photo = users.fieldByName("photo");
// }
// var userPhoto = Ti.UI.createImageView({
// image: photo,
// width:40,
// height:40,
// borderRadius:20,
// borderWidth:2,
// borderColor:"#fff",
// right:-15
// });
//
// $.photos.add(userPhoto);
// users.next();
// }

if ($.args.type == "add") {
	$.details.visible = true;
	$.detailsLabel.visible = false;

	$.dateTextField.visible = true;
	$.dateLabel.visible = false;
	// $.dateTextField.setValue(new Date().toUTCString());

	$.locationTextField.visible = true;
	$.locationLabel.visible = false;

	$.budgetTextField.visible = true;
	$.budgetLabel.visible = false;

	$.nameTextField.visible = true;
	$.title.visible = false;

	$.happeningPhotoView.visible = true;

	$.saveView.visible = true;

	$.happeningInfo.remove($.bookingView);
	
	$.photoIcon.visible = true;

} else {
	$.details.visible = false;
	$.detailsLabel.visible = true;

	$.dateTextField.visible = false;
	$.dateLabel.visible = true;

	$.locationTextField.visible = false;
	$.locationLabel.visible = true;

	$.budgetTextField.visible = false;
	$.budgetLabel.visible = true;

	$.nameTextField.visible = false;
	$.title.visible = true;
	
	$.photoIcon.visible = false;

	// $.scrollView.remove($.happeningPhotoView);

	$.scrollView.remove($.saveView);

	$.scrollView.remove($.accessibilityContainer);

	var photo;
	var id = $.args.id;
	var happeningInfo = Alloy.Globals.db.execute("SELECT * FROM happening WHERE id = ?", id);

	$.locationLabel.text = happeningInfo.fieldByName("location");
	$.budgetLabel.text = "Budget: " + happeningInfo.fieldByName("budget");
	$.detailsLabel.text = happeningInfo.fieldByName("details");
	$.title.text = happeningInfo.fieldByName("name");
	$.dateLabel.text = happeningInfo.fieldByName("created_date");
	var photoLink = Alloy.Globals.db.execute("SELECT * FROM media WHERE happening_id = ?", id);
	$.showPhoto.visible = true;
	while(photoLink.isValidRow()){
		if(photoLink.fieldByName("media_link") != '' || photoLink.fieldByName("media_link") != null){
			$.photo.image = photoLink.fieldByName("media_link");
		}else{
			alert("No photo");
		}
		
		photoLink.next();
	}
	

}

function focusPage() {
	alert("foucsed page");
}

function saveHappening() {
	var name = $.nameTextField.getValue();
	var date = $.dateTextField.getValue();
	var location = $.locationTextField.getValue();
	var budget = $.budgetTextField.getValue();
	var details = $.details.getValue();

	if (name != '' && location != '' && budget != '' && details != '' && date != '') {
		Alloy.Globals.db.execute('INSERT INTO happening (name, location, budget, accessibility, details, created_date) values("' + name + '", "' + location + '", ' + budget + ', "' + accessibility + '", "' + details + '","' + date + '")');
		var lastHappening = Alloy.Globals.db.execute("SELECT * FROM happening order by id desc limit 1");
		if (profilePhoto != null) {
			Alloy.Globals.db.execute("INSERT INTO media (happening_id, media_link, media_type) values(?,?,?)", lastHappening.fieldByName("id"), profilePhoto, 'photo');
		}

		Alloy.Globals.notify('Happening is successfully created');

		Alloy.Globals.updateHome = true;
		Alloy.createController("home").getView().open();

	} else {
		Alloy.Globals.notify("Please fill all the fields.");
	}

}

var profilePhoto;
function uploadPhoto() {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions();
	}
	Ti.Media.openPhotoGallery({
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
		success : function(e) {

			profilePhoto = e.media;

			$.photo.image = "";
			$.photo.image = profilePhoto;
			$.showPhoto.visible = true;
		},
		error : function(e) {
			alert('error');
		}
	});
}

var accessibility = 'pu';
function publicClicked() {
	$.publicRadio.image = "/images/radio_checked.png";
	$.privateRadio.image = "/images/radio_unchecked.png";
	if (accessibility == 'pr') {
		$.publicRadio.image = "/images/radio_checked.png";
		$.privateRadio.image = "/images/radio_unchecked.png";
		accessibility = 'pu';
	}
}

function privateClicked() {
	$.publicRadio.image = "/images/radio_unchecked.png";
	$.privateRadio.image = "/images/radio_checked.png";
	if (accessibility == 'pu') {
		$.privateRadio.image = "/images/radio_checked.png";
		$.publicRadio.image = "/images/radio_unchecked.png";
		accessibility = 'pr';
	}
}

$.dateTextField.addEventListener('focus', function() {
	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		backgroundColor:"#000"
	});
	picker.showDatePickerDialog({
		callback : function(e) {
			if (!e.cancel) {
				var dateValue = e.value;
				// $.dateTextField.value = (dateValue.getMonth() + 1) + '/' + dateValue.getDate() + '/' + dateValue.getFullYear();
				$.dateTextField.value = e.value;
				$.dateTextField.blur();
			}
			// alert(e.value);
		}
	});
});

// $.timeTextField.addEventListener('click', function() {
	// var picker = Ti.UI.createPicker({
		// type : Ti.UI.PICKER_TYPE_TIME,
		// backgroundColor:"#000"
	// });
	// picker.showTimePickerDialog({
		// callback : function(e) {
			// var time = e.value;
			// $.timeTextField.value = time.getHours() + ':' + time.getMinutes();
			// $.timeTextField.blur();
		// }
	// });
// });
