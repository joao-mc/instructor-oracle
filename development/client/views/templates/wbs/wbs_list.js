// provide the data from the colleciton
Template.wbsList.helpers({
    wbsItems: function(){
        return Wbs.find({}, {sort: {abbrev: 1}});
    }
});

// when the dom is loaded
Template.wbsList.rendered = function(){
    this.$('.btn-wbs-edit').tooltip();
};