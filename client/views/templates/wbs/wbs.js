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
        var wbs = Wbs.findOne({abbrev: (inputElement.value).toUpperCase()});

        // clear input
        inputElement.value = "";

        // set new wbs
        Session.set('currentWbs', wbs);
    }
});

// helper working with session variables
Handlebars.registerHelper('currentWbs',function(){
    return Session.get('currentWbs');
});