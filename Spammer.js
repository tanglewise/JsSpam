// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var performance = require("performance-now");
var IOTA = require("iota.lib.js");


var host = 'http://localhost'
var port = 14265

var seed = 'SSFM9SBA9GIREICDJU9FVUAKZUU9KLXUIFIYMAJQHUKCKRXWFJKDJG9DCHSOIEGH9';
var address = 'GOOGLE9DOT9COM9999999999999999999999999999999999999999999999999999999999999999999';
var value = 0;
var message = "";
var tag = "GOOGLE9DOT9COM";
var depth = 3;
var weight = 14;


var iota  = new IOTA({
  'host': 'http://localhost',
  'port': port
})

var transfers = [{
  'address': address,
  'value': value,
  'message': message,
  'tag': tag
}];

function get_node_info() {
    iota.api.getNodeInfo(function(e, s) {
      if (e) {
        console.log('error getting node info: ' + e);
      }
      console.log('node info' + s);
    });
}

function send_tx() {
  iota.api.sendTransfer(allnine, depth, weight, transfers, function(e, s) {
      if (e) {
          console.log("error sending transfer: " + e);
      }
      console.log("transfer complete: " + s);
  });

}

function spam() {
  while (true) {
    send_tx();
  }
}

get_node_info()
spam()
