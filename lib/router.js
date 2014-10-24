Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {

    // when landing, redirect to wbs route...this structure allows for the site to be expandable
    this.route('/', {
        action: function() {
            this.redirect('wbs');
        }
    });

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
        //action: function(){
        //    this.render();
        //},
        //onAfterAction: function(){
        //    Meteor.setTimeout(function(){
        //        console.log('on after action');
        //        this.$('#wbsSearch').focus();
        //    }, 500);
        //}
    });

    // edit a code
    this.route('wbsEdit', {
        path: '/wbs/:_wbsAbbrev/edit',
        data: function() {
            return Wbs.findOne({abbrev: this.params._wbsAbbrev});
        }
    });

});