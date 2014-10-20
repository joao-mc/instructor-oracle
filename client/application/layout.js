Template.layout.wbsSource(function () {
    return Wbs.find({modifier: false}).fetch().map(function (obj) {
        return obj.abbrev;
    });
});