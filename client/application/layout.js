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
    'submit': function (event, template) {

        // prevent default behavior and stop bubbling
        event.preventDefault();
        event.stopPropagation();

        // store dom element in variable
        var inputElement = template.find('input#wbsSearch');

        // TODO add code verification
        // access value in form and extract abbreviation if found
        var abbrev = Wbs.findOne({abbrev: (inputElement.value).toUpperCase()}).abbrev;

        // clear input
        inputElement.value = "";

        // TODO figure out how to navigate to new code when already on route
        // go to the page
        Router.go('wbs', {_wbsAbbrev: abbrev});
    }
});