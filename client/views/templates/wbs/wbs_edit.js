// TODO figure out how to hide delete button when creating a new record
// on load and dom render finish
Template.wbsEdit.rendered = function () {
    if (!this.data) {
        this.$('#btnDelete').hide();
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
        // save the values in a variable
        var thisWbs = {
            abbrev: template.find('#inputAbbrev').value,
            code: template.find('#inputCode').value,
            desc: template.find('#inputDesc').value,
            course: template.find('#inputIsCourse').checked,
            modifier: template.find('#inputIsModifier').checked
        };

        // if editing an active record, update the record
        if (template.data){
            Wbs.update(template.data._id, thisWbs);

        // otherwise, insert a new one
        } else {
            Wbs.insert(thisWbs);
        }

        // return to the list of wbs codes
        Router.go('wbsList');
    },

    // delete wbs code
    'click #btnDelete': function (event, template) {
        Wbs.remove(template.data._id);
        Router.go('wbsList');
    }
});