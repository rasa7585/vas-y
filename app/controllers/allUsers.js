// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.indicatorR.transform = Ti.UI.create2DMatrix().rotate(45);
$.indicatorF.transform = Ti.UI.create2DMatrix().rotate(45);
$.indicatorF.hide();
$.lineF.hide();

///////////////////////temporarily assigned
// var happeningId = $.args.id;
var happeningId = 3;

var friendItems = [];
var registeredItems = [];

function loadUsers() {

    registeredItems = [];
    $.section.setItems([]);

    var happeningData = Alloy.Globals.db.execute('SELECT * FROM participants WHERE happening_id=?', happeningId);
    // var happeningData = Alloy.Globals.db.execute("SELECT * FROM participants WHERE happening_id = ?", happeningId);
    var rsvp = null;
    var color = null;

    while (happeningData.isValidRow()) {

        if (happeningData.fieldByName('RSVP') == 'p') {
            rsvp = 'Pending';
            color = '#e5e216';
        } else if (happeningData.fieldByName('RSVP') == 'y') {
            rsvp = 'Coming';
            color = '#03c564';
        } else if (happeningData.fieldByName('RSVP') == 'n') {
            rsvp = 'Not Coming';
            color = '#e3000d';
        }

        var userData = Alloy.Globals.db.execute('SELECT * FROM users WHERE id=?', happeningData.fieldByName('user_id'));

        registeredItems.push({
            properties:{
            searchableText : userData.fieldByName('name')
            },
            userName : {
                text : userData.fieldByName('name')
            },
            profileIMG : {
                image : userData.fieldByName('photo')
            },
            status : {
                text : rsvp,
                color : color
            }
        });

        happeningData.next();
    }

    $.section.items = registeredItems;

}


loadUsers();

function showFriendsTab() {

    $.facebookUsers.opacity = 1;
    $.registeredUsers.opacity = 0.5;
    $.lineF.show();
    $.lineR.hide();
    $.indicatorF.show();
    $.indicatorR.hide();

    $.section.items = friendItems;

}

function applyFilter() {
    $.mySearchView.setValue($.searchField.getValue());
}

function showRegisteredTab() {

    $.facebookUsers.opacity = 0.5;
    $.registeredUsers.opacity = 1;
    $.lineF.hide();
    $.lineR.show();
    $.indicatorF.hide();
    $.indicatorR.show();

    $.section.items = registeredItems;

}
