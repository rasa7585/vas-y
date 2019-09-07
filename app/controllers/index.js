function openUserRegisterationPage(){
	Alloy.createController("userRegisteration").getView().open();
}

function openAllUsersPage(){
	Alloy.createController('allUsers').getView().open();
}

function openHome(){
	Alloy.createController('home').getView().open();
	// Alloy.createController('listOfFriends').getView().open();
}


function login(){
	
	var email = $.username.getValue();
	var password = $.password.getValue();
	var matchedEmails = [];
	var matchedPassword;
	var matchedEmailsL = 0;
	var usersId ;
	
	var data = Alloy.Globals.db.execute('SELECT email,password,id FROM users WHERE email LIKE "'+ email +'"');
	
	while(data.isValidRow()){
		
		matchedEmails.push(data.fieldByName('email'));
		matchedPassword = data.fieldByName('password');
		usersId = data.fieldByName('id');
			
		data.next();
	}
	
	matchedEmailsL = matchedEmails.length;
		
	if(matchedEmailsL == 1){
		if(matchedPassword == password){
			// alert('Now you can login');
			Alloy.Globals.currentUserId = usersId;
			Ti.App.Properties.setInt("userId", usersId);
			Ti.App.Properties.setString("email", matchedEmailsL);
			openHome();
			
		}else{
			Alloy.Globals.notify('Password is wrong');
		}
	}else if(matchedEmailsL == 0){
		Alloy.Globals.notify('Your email is worng');
	}
	
}

$.loginWin.addEventListener("android:back", function(e){
	
});

if (Ti.App.Properties.getString("email") == null) {
	setTimeout(function(){
		$.loginWin.open();
	},2000);
	
}else{
	setTimeout(function(){
		Alloy.createController("home").getView().open();
	},2000);
	
}
