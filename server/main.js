Meteor.startup(function () {
  // code to run on server at startup
  if (!Bills.findOne()) {
    console.log('Inserting some initial mock data');
    Bills.insert({
      type: 'bill+receipt',
      serviceProvider: 'Amazon Web Services',
      billDate: new Date(2015, 11, 3),
      periodStart: new Date(2015, 10, 1),
      periodEnd: new Date(2015, 10, 31),
      sumToPay: 15,
      sumPaid: 15,
      billCurrency: 'USD'
    });
    var iec_bill = Bills.insert({
      type: 'bill',
      serviceProvider: 'חברת חשמל',
      billDate: new Date(2015, 11, 3),
      periodStart: new Date(2015, 9, 7),
      periodEnd: new Date(2015, 10, 26),
      sumToPay: 676,
      billCurrency: 'ILS'
    });
    Bills.insert({
      type: 'receipt',
      billRef: iec_bill,
      receiptDate: new Date(2015, 11, 10),
      sumPaid: 676
    });
  }
});

/////
// collection publications
// TODO(itamar): this is equivalent to autopublish at the moment
// so do this better... (e.g. limit to logged in user, paginate?, etc.)
/////
Meteor.publish("bills", function() {
  return Bills.find({});
});
