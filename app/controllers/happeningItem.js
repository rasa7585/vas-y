// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var id = $.args.id;
var containerWidth = $.args.width;
var innerElementsWidth = $.args.innerElements;
var itemWidth = $.args.itemWidth;
function loadInfo() {
    var count = 0;
    var calculatedPercentage = 0;
    var determinedColor = null;
    var happeningInfo = Alloy.Globals.db.execute("SELECT * FROM happening WHERE id = ?", id);
    var countDoneTasks = 0;
    var countAllTasks = 0;
	$.container.width = containerWidth;
	$.item.width = itemWidth;
	$.happeningImg.width = innerElementsWidth;
	$.middel.width = innerElementsWidth;
	$.topView.width = innerElementsWidth;
    var descData = Alloy.Globals.db.execute('SELECT * FROM content WHERE happening_id=?', id);
    var imgData = Alloy.Globals.db.execute('SELECT * FROM media WHERE happening_id=? LIMIT 1', id);
    var tasksData = Alloy.Globals.db.execute('SELECT * FROM tasks WHERE happening_id=?', id);
    $.title.text = happeningInfo.fieldByName("name");
    $.desc.text = happeningInfo.fieldByName("details").substr(0,100);
    
    while (tasksData.isValidRow()) {

        if (tasksData.fieldByName('done') == 1) {
            countDoneTasks++;
        }

        countAllTasks++;
        tasksData.next();
    }
    
    calculatedPercentage = Math.round((countDoneTasks * 100) / countAllTasks);

    if (calculatedPercentage >= 0 && calculatedPercentage < 30) {
        determinedColor = '#e3000d';
    } else if (calculatedPercentage >= 30 && calculatedPercentage < 60) {
        determinedColor = '#ff800d';
    } else if (calculatedPercentage >= 60 && calculatedPercentage < 90) {
        determinedColor = '#e5e216';
    } else if (calculatedPercentage >= 90 && calculatedPercentage <= 100) {
        determinedColor = '#03c564';
    } else{
        determinedColor = '#e3000d';
    }
    
    while (imgData.isValidRow()) {
        $.happeningImg.image = imgData.fieldByName('media_link');
        imgData.next();
    }
    while (descData.isValidRow()) {
        $.desc.text = descData.fieldByName('body');
        descData.next();    
    }
    
    if(calculatedPercentage>=0){
        $.presetage.text = calculatedPercentage + " %";
    }else{
        $.presetage.text = "0 %";
    }
    
    $.completedTaskPresentage.backgroundColor = determinedColor;

}

loadInfo();
function showDetails() {
	Ti.App.Properties.setInt("happening_id", id);
    Alloy.createController('happeningDetails', {
        'id' : id,
        'type':'details'
    }).getView().open();
}
