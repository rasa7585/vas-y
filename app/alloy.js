// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
// (function(){
// var ACS = require('ti.cloud'),
    // env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    // username = Ti.App.Properties.getString('acs-username-'+env),
    // password = Ti.App.Properties.getString('acs-password-'+env);
// 
// 
// 
// 
// 
// // if not configured, just return
// if (!env || !username || !password) { return; }
// /**
 // * Appcelerator Cloud (ACS) Admin User Login Logic
 // *
 // * fires login.success with the user as argument on success
 // * fires login.failed with the result as argument on error
 // */
// ACS.Users.login({
	// login:username,
	// password:password,
// }, function(result){
	// if (env==='development') {
		// Ti.API.info('ACS Login Results for environment `'+env+'`:');
		// Ti.API.info(result);
	// }
	// if (result && result.success && result.users && result.users.length){
		// Ti.App.fireEvent('login.success',result.users[0],env);
	// } else {
		// Ti.App.fireEvent('login.failed',result,env);
	// }
// });
// 
// })();

Alloy.Globals.updateHome = true;
Alloy.Globals.homeWin = true;
Alloy.Globals.db = Ti.Database.install("mvp.db", "mvp.db");
Alloy.Globals.material_icons = OS_IOS ? 'Material Icons' : 'material_icons.ttf';
Alloy.Globals.montserrat_regular = OS_IOS ? 'Montserrat' : "Montserrat-Regular.ttf";
Alloy.Globals.montserrat_bold = OS_IOS ? 'Montserrat' :"Montserrat-Bold.ttf";

Alloy.Globals.notify = function(message){
  Ti.UI.createNotification({
      message: "Vas-y, " + message
  }).show();
};

