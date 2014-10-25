// function for populating typeahead
var goTypeahead = function() {

    // get a list of abbreviations for typeahead
    var wbsList = Wbs.find({modifier: false}).fetch().map(function (wbsItem) {
        return wbsItem.abbrev;
    }).sort();

    // call method to infect with typeahead
    Meteor.typeahead('input#wbsSearch', function () {

        // return the sorted list
        return wbsList;
    });
};

// execute when the template first loads
Template.layout.rendered = function(){

    Meteor.setTimeout(function(){

        // initially hide the wbs search alert
        this.$('#wbsSearchAlert').hide();

        // infect with typeahead
        goTypeahead();

        // set the focus to the search input
        this.$('input#wbsSearch').focus();

    }, 0);
};

// execute when this template loads from using navigation menu
Router.onAfterAction(function () {

    // for some reason, have to put this in the set timeout or the dom will not have loaded yet
    setTimeout(function () {

        // initially hide the wbs search alert
        this.$('#wbsSearchAlert').hide();

        // infect with typeahead
        goTypeahead();

        // set the focus to the search input
        this.$('input#wbsSearch').focus();

    }, 0);

    // only apply to the wbs route
}, {only: ['wbs']});

// manage event handlers for form
Template.layout.events({

    // catch submit event for wbs form
    'submit': function (event, template) {

        // prevent default behavior and stop bubbling
        event.preventDefault();
        event.stopPropagation();

        // store dom element value in variable
        var inputElement = template.find('input#wbsSearch');
        var inputVal = inputElement.value.toUpperCase();

        // TODO add code verification
        // access value in form and extract abbreviation if found
        var wbsQuery = Wbs.findOne( {abbrev: inputVal.toUpperCase()} );

        // if the query is not found
        if (!wbsQuery) {

            // place the invalid query in the session variable
            Session.set('wbsQuery', inputVal);

            // show the alert div
            template.$('#wbsSearchAlert').show();

        // if the query is found
        } else {

            // hide the query alert
            template.$('#wbsSearchAlert').hide();

            // set the session variable
            Session.set('currentWbs', wbsQuery);
        }

        // clear input
        inputElement.value = "";
    }
});

// helpers for working with session variables
Template.registerHelper('currentWbs', function () {
    return Session.get('currentWbs');
});
Template.registerHelper('wbsQuery', function() {
    return Session.get('wbsQuery');
});