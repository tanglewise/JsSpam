var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var performance = require("performance-now");
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
}]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function get_node_info() {
  node_running = false;
  iota.api.getNodeInfo(function(e, s) {
    if (e) {
      console.log('error getting node info: ' + e);
    } else {
      node_running = true;
      console.log('else')
    }
    console.log('node info: ' + JSON.stringify(s));
  });

  return node_running
}

function send_tx() {
  iota.api.sendTransfer(seed, depth, weight, transfers, function(e, s) {
      if (e) {
          console.log("error sending transfer: " + e);
      }
      console.log("transfer complete: " + JSON.stringify(s));
  });
}

async function spam() {
  var ready = get_node_info();

  if (ready) {
    print('spamming')
    while (true) {
      send_tx();
    }
  } else {
    console.log('wasnt ready, retrying in 1000 ms');
    await sleep(1000);
    spam();
  }
}

spam();
