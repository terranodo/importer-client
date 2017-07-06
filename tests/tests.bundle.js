var context = require.context('.', true, /.+\.test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
import "babel-polyfill";
import td from 'testdouble';
var chaiAsPromised = require("chai-as-promised");
var tdChai = require("testdouble-chai");
chai.use(chaiAsPromised);
chai.use(tdChai(td));
