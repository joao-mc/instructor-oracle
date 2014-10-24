Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {

    // view all the codes as a list
    this.route('wbsList', {
        path: '/wbs/list'
    });

    // new route
    this.route('wbsEdit', {
        path: '/wbs/new'
    });

    // home route where wbs and timesheet are both visible
    this.route('wbs', {
        path: '/wbs'
    }, function () {
        this.render('wbs-detail', {
            path: '/wbs/:_wbsAbbrev',
            to: 'wbs-detail',
            data: function () {
                theOne = Wbs.findOne({abbrev: this.params._wbsAbbrev});
                console.log(theOne.abbrev);
                return theOne;
            }
        });
    });

    // edit a code
    this.route('wbsEdit', {
        path: '/wbs/:_wbsAbbrev/edit',
        data: function() {
            return Wbs.findOne({abbrev: this.params._wbsAbbrev});
        }
    });

});