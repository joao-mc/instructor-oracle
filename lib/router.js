Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {

    // when landing, redirect to wbs route...this structure allows for the site to be expandable in the future
    this.route('/', {
        action: function() {
            this.redirect('wbs');
        }
    });

    // view all the codes as a list
    this.route('wbsList', {
        path: '/wbs/list'
    });

    // home route where wbs and timesheet are both visible
    this.route('wbs', {
        path: '/wbs'
    });

    // edit a code
    this.route('wbsEdit', {
        path: '/wbs/:_wbsAbbrev/edit',
        data: function() {
            return Wbs.findOne({abbrev: this.params._wbsAbbrev});
        }
    });
});