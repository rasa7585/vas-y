// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var items = [];

function loadInterests() {

    items = [];

    var data = Alloy.Globals.db.execute('SELECT * FROM interests');

    while (data.isValidRow()) {

        var id = data.fieldByName('id');
        var count = 0;

        var userInterData = Alloy.Globals.db.execute('SELECT * FROM user_interests WHERE interest_id=? and user_id=?', id, Ti.App.Properties.getInt("userId"));
        while (userInterData.isValidRow()) {

            count++;

            userInterData.next();
        }

        if (count == 0) {
            items.push({
                itemId : id,
                optionLbl : {
                    text : data.fieldByName('name')
                },
                optionIcon : {
                    text : 'check_box_outline_blank'
                }
            });
        } else if (count == 1) {
            items.push({
                itemId : id,
                optionLbl : {
                    text : data.fieldByName('name')
                },
                optionIcon : {
                    text : 'check_box'
                }
            });
        }

        data.next();
    }

    $.section.items = items;
}

loadInterests();

function setInfo() {
	
    try {
        var userData = Alloy.Globals.db.execute('SELECT name,email,photo From users WHERE id=?', Ti.App.Properties.getInt("userId"));

        $.profileImg.image = userData.fieldByName('photo');
        $.profilePhoto.borderWidth = 3;
        $.name.text = userData.fieldByName('name');
    } catch(e) {
        alert("Please login");
    }

}

function itemClicked(e) {

    var clickedInterest = items[e.itemIndex].itemId;
    var count = 0;

    var checkData = Alloy.Globals.db.execute('SELECT * FROM user_interests WHERE interest_id=? and user_id=?', clickedInterest, Ti.App.Properties.getInt("userId"));

    while (checkData.isValidRow()) {

        count++;

        checkData.next();
    }

    if (count == 0) {
        Alloy.Globals.db.execute('INSERT INTO user_interests (user_id, interest_id) values(' + Ti.App.Properties.getInt("userId") + ', ' + clickedInterest + ')');
        items[e.itemIndex].optionIcon.text = 'check_box';
    } else if (count == 1) {
        Alloy.Globals.db.execute('DELETE FROM user_interests WHERE interest_id=? and user_id=?', clickedInterest, Ti.App.Properties.getInt("userId"));
        items[e.itemIndex].optionIcon.text = 'check_box_outline_blank';
    }

    $.section.setItems([]);
    $.section.items = items;
}


function logout() {
    Ti.App.Properties.setInt("userId", null);
    Ti.App.Properties.setString("email", null);
    Alloy.createController("index").getView().open();
    $.profileWin.close();
    Alloy.Globals.homeWin.close();
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
