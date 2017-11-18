FS.debug = true;
Bills = new Mongo.Collection("bills");
BillFiles = new FS.Collection("billfiles", {
  stores: [new FS.Store.FileSystem("billfiles")]
});
