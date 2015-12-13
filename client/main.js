/////
// accounts config
/////

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

/////
// routing
/////

Router.configure({
  layoutTemplate: 'app_layout'
});

Router.route('/', function () {
  this.render('main');
});

/////
// collections subscriptions
/////

Meteor.subscribe("bills");

/////
// template helpers
/////

// ref: http://stackoverflow.com/a/28710902/913827
Template.registerHelper('equals',
  function(v1, v2) {
    return (v1 === v2);
  }
);

Template.main.helpers({
  bills:function() {
    return Bills.find({});
  }
});

Template.bill.helpers({
  getBill:function (billId) {
    return Bills.findOne({_id: billId});
  }
});

/////
// template events
/////
Template.app_layout.events({
  'submit .js-nav-search':function (event) {
    console.log('not implemented yet');
    return false; // stop the form submit from reloading the page
  }
});
