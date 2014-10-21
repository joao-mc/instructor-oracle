Meteor.typeahead('input#wbsSearch', function () {

    // create list of abbreviations
    var wbsList = Wbs.find({modifier: false}).fetch().map(function (wbsItem) {
        return wbsItem.abbrev;
    });

    // return the sorted list
    return wbsList.sort();
});