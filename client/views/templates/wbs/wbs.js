// function for populating typeahead
var goTypeahead = function () {

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
Template.layout.rendered = function () {

    // disable the input field until typeahead is finished
    this.$('input#wbsSearch').enabled = false;

    // initially hide the wbs search alert
    this.$('#wbsSearchAlert').hide();

    // Give it just enough time for the iframe to load. Then steal the focus back.
    Meteor.setTimeout(function () {

        // infect with typeahead
        goTypeahead();

        // enable the input field
        this.$('input#wbsSearch').enabled = true;

        // set the focus to the search input
        this.$('input#wbsSearch').focus();

    }, 500);
};

// execute when this template loads from using navigation menu
Router.onAfterAction(function () {

    // for some reason, have to put this in the set timeout or the dom will not have loaded yet
    setTimeout(function () {

        // initially hide the wbs search alert
        this.$('#wbsSearchAlert').hide();

        // infect with typeahead
        goTypeahead();

    }, 0);

    // Give it just enough time for the iframe to load. Then steal the focus back.
    Meteor.setTimeout(function () {

        // set the focus to the search input
        this.$('input#wbsSearch').focus();

    }, 500);

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

        // get the input value, to uppercase and trim whitespace
        var inputVal = inputElement.value.toUpperCase().trim();

        // access value in form and extract abbreviation if found
        var wbsQuery = Wbs.findOne({abbrev: inputVal});

        // if the query is not found
        if (!wbsQuery) {

            // place the invalid query in the session variable
            Session.set('wbsQuery', inputVal);

            // set the current wbs session variable to null
            Session.set('currentWbs', null);

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


// querying for specific resources and helpers to render in the template
Template.wbs.helpers({
    currentWbs: function () {
        return Session.get('currentWbs');
    },
    wbsQuery: function() {
        return Session.get('wbsQuery');
    },
    courseModifiers: function () {
        return Wbs.find({modifier: true});
    }
});