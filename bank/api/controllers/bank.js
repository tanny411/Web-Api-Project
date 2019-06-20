var util = require('util');
var mysql = require('mysql');
var crypto = require('crypto');

module.exports = {
  accVerify: accVerify,
  balance: balance,
  send: send,
  record: record
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("use bank", function (err, result) {
    if (err) throw err;
  });
});

function accVerify(req, res) {
  var acc = req.body.Acc;
  var pin = req.body.Pin;
  console.log('Account Verification Request Ashche')
  con.query("SELECT pin FROM user WHERE acc="+acc, function (err, result) {
    if (err)  throw err;
    if(result.length==1 && result[0].pin==pin) {
        res.json("1"); 
    } 
    else {
        res.json("0");
    }
  });
}

function balance(req, res) {
  var acc = req.body.acc;
  var pin = req.body.pin;
  console.log('Balance Request Ashche')
  con.query("SELECT balance FROM user WHERE acc="+acc+" and pin="+pin, function (err, result) {
    if (err) throw err;
    res.json(result[0].balance);
  });
}

function send(req, res) {
  // console.log(req.body);
  var facc = req.body['From Account'];
  var pin = req.body.Pin;
  var amnt = req.body.Amount;
  var tacc = req.body['To Account'];
  // console.log(facc, pin, amnt, tacc);
  con.query("UPDATE user SET balance=balance-"+amnt+" WHERE acc="+facc+" and pin="+pin, function (err, result) {
    if (err) throw err;
  });
  con.query("UPDATE user SET balance=balance+"+amnt+" WHERE acc="+tacc, function (err, result) {
    if (err) throw err;
    res.json("1");
  });
}

function record(req, res) {
  var amt = req.body.amt;
  var acc = req.body.acc;
  var record = crypto.randomBytes(20).toString('hex');
  // console.log(record);
  var str = "insert into transactions(acc,amount,record)values ("+acc+","+amt+",'"+record+"')";
  con.query(str, function (err, result) {
    if (err) throw err;
    res.json(record);
  });
}