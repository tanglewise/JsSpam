var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var performance = require("performance-now");
var IOTA = require("iota.lib.js");
var async = require('async');

var host = 'http://localhost'
var port = 14265

var seed = 'SSFM9SBA9GIREICDJU9FVUAKZUU9KLXUIFIYMAJQHUKCKRXWFJKDJG9DCHSOIEGH9';
var address = '999999999999999999999999999999999999999999999999999999999999999999999999999999999';
var value = 0;
var message = "";
var tag = '999999999999999999999999999';
var depth = 3;
var weight = 14;
var txs_sent = 0;
var start_time = performance();

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
  tx_time = performance();
  console.log('spam time: ' + (tx_time - start_time) + ' ms');
  start_time = tx_time;
  send_tx(function() {
    console.log('txs sent: ' + txs_sent);
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
      txs_sent++;
      return callback();
    
  });
}

start_spamming();
