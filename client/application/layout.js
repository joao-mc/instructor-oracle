Meteor.typeahead('input#wbsSearch', function(){
    return Wbs.find({modifier: false}).fetch().map(function(wbsItem){ return wbsItem.abbrev; });
});