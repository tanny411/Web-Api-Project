var util = require('util');
var mysql = require('mysql');

module.exports = {
  accVerify: accVerify,
  balance,balance
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
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
    if (err) { console.log(err); throw err;}
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
