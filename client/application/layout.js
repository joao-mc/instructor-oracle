// Wait until the template is rendered so the element exists to infect typeahed with
Template.layout.rendered = function () {

    // call method to infect with typeahead
    Meteor.typeahead('input#wbsSearch', function () {

        // create list of abbreviations
        var wbsList = Wbs.find({modifier: false}).fetch().map(function (wbsItem) {
            return wbsItem.abbrev;
        });

        // return the sorted list
        return wbsList.sort();
    });
};

// manage event handlers for form
Template.layout.events({

    // catch submit event for wbs form
    'submit': function (event) {

        // prevent default behavior and stop bubbling
        event.preventDefault();
        event.stopPropagation();

        // be proud of it actually working
        console.log('Submitting form!');
    }
});