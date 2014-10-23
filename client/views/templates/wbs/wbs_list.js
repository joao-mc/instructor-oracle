Template.wbsList.helpers({
    wbsItems: function(){
        return Wbs.find({}, {sort: {abbrev: 1}});
    }
});