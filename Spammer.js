var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var performance = require("performance-now");
var IOTA = require("iota.lib.js");
var async = require('async');

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

function start_spamming() {
  iota.api.getNodeInfo(function(e, s) {
    if (e) {
      console.log('error getting node info: ' + e);
//      start_spamming();
    } else {
      console.log('node info: ' + JSON.stringify(s));
      spam();
    }
  });
}

function spam() {
  send_tx(function() {
    console.log('tx sent : - )');
    spam();
  });
}

function send_tx(callback) {
  console.log('sending tx..');
  iota.api.sendTransfer(seed, depth, weight, transfers, function(e, s) {
      if (e) {
          console.log("error sending transfer: " + e);
      }
      console.log("transfer complete: " + JSON.stringify(s));
      return callback();
  });
}

start_spamming();
