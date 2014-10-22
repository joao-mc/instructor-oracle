Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {

    // home route where wbs and timesheet are both visible
    this.route('wbs', {path: '/'});

    // route to individual wbs codes with the timesheet visible
    this.route('wbs_item', {
        path: '/:_wbsCode',
        data: function () {
            return Wbs.findOne({abbrev: this.params._wbsCode});
        }
    });
});