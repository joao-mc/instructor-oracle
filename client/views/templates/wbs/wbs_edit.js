// TODO figure out how to hide delete button when creating a new record
// on load and dom render finish
Template.wbsEdit.rendered = function(){
    if (this.data == null){
        template.find('#btnDelete').hide();
    }
};

// event handler
Template.wbsEdit.events({

    // check for checkbox mutual exclusivity when course checkbox changes
    'change #inputIsCourse': function (event, template) {
        template.find('#inputIsModifier').checked = false;
    },

    // check for checkbox mutual exclusivity when modifier checkbox changes
    'change #inputIsModifier': function (event, template) {
        template.find('#inputIsCourse').checked = false;
    },

    // submit event
    'submit': function (event, template) {

        // prevent default behavior and stop bubbling
        event.preventDefault();
        event.stopPropagation();

        // TODO figure out how to account for new record creation...right now _id does not exist, so puking
        // update if record exists or create new if it does not
        Wbs.upsert(template.data._id, {
            abbrev: template.find('#inputAbbrev').value,
            code: template.find('#inputCode').value,
            desc: template.find('#inputDesc').value,
            course: template.find('#inputIsCourse').checked,
            modifier: template.find('#inputIsModifier').checked
        });

        // return to the list of wbs codes
        Router.go('wbsList');
    },

    // delete wbs code
    'click #btnDelete': function (event, template) {
        Wbs.remove(template.data._id);
        Router.go('wbsList');
    }
});