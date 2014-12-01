// when the dom is loaded
Template.layout.rendered = function () {
    var image = '<img src="/images/pepeLePew.png" />';
    $('#skunk').popover({
        title: 'The Le Pewest!',
        placement: 'top',
        content: image,
        html: true,
        trigger: 'hover'
    });
};