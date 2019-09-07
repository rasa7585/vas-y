// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var repeatedEmail = false;

function checkEmail() {

	var email = $.username.getValue();
	var matchEmails = [];
	var matchEmailsL = 0;

	var data = Alloy.Globals.db.execute('SELECT email FROM users WHERE email LIKE "' + email + '"');

	while (data.isValidRow()) {

		matchEmails.push(data.fieldByName('email'));

		data.next();
	}

	matchEmailsL = matchEmails.length;

	if (matchEmailsL == 1) {
		repeatedEmail = true;
	} else {
		repeatedEmail = false;
	}

}

var verificationDialog = Ti.UI.createAlertDialog({
	androidView : Alloy.createController("verificationDialog").getView(),
});

var name,
    password,
    email;
function createUser() {
	name = $.name.getValue();
	password = $.password.getValue();
	email = $.username.getValue();

	if (name != '' && email != '' && password != '') {
		if (validateEmail(email)) {
			// alert(email + " is valid :");
			checkEmail();
			if (repeatedEmail == false) {

				verificationDialog.show();

			} else if (repeatedEmail == true) {
				Alloy.Globals.notify('This email is already in use!\n Please enter a different email.');
			}
		} else {
			Alloy.Globals.notify("Please enter a valid email address!");
		}

	} else {
		Alloy.Globals.notify('fill the missing fields!');
	}

}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

Ti.App.addEventListener("sendCode", function(e) {
	Alloy.Globals.db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', name, email, password);
	Ti.App.Properties.setString("email", email);

	var lastUser = Alloy.Globals.db.execute('SELECT * FROM users order by id desc limit 1');
	Ti.App.Properties.setInt("userId", lastUser.fieldByName("id"));
	Alloy.createController("home").getView().open();

	Alloy.Globals.notify('Your account is successfully created');
});

function login() {
	Alloy.createController("index").getView().open();
}

$.userWind.addEventListener("android:back", function(e) {

});
