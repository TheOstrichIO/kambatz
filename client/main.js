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

Router.route('/upload');

/////
// collections subscriptions
/////

Meteor.subscribe("bills");
Meteor.subscribe("billfiles");

/////
// template helpers
/////

// ref: http://stackoverflow.com/a/28710902/913827
Template.registerHelper('equals',
  function(v1, v2) {
    return (v1 === v2);
  }
);

Template.app_layout.helpers({
  activeIf:function(templatePath) {
    // console.log(Router.current().route.path());
    return (templatePath == Router.current().route.path() ? 'active' : '');
  }
});

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

Template.upload.helpers({
  billfiles:function() {
    return BillFiles.find({});
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

Template.upload.events({
  // Catch the dropped event
  'dropped #dropzone': function(event, temp) {
    var files = event.originalEvent.dataTransfer.files;
    console.log(`${files.length} files dropped`);
    for (var i=0; i < files.length; ++i) {
      var file = files[i];
      console.log(`File #${i+1}: ${file.name} (${file.size} bytes, ` +
                  `type ${file.type})`);
    }

    FS.Utility.eachFile(event, function(file) {
      BillFiles.insert(file, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
        if (err) {
          console.log('error!');
          console.log(err);
        } else {
          console.log(`Inserted file ${fileObj._id}`);
        }
      });
    });
  }
});
