Meteor.methods({
  addNewBill:function(file) {
    return BillFiles.insert(file);
  }
});
