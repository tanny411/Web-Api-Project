var util = require('util');
var mysql = require('mysql');

module.exports = {
  accVerify: accVerify
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
  con.query("SELECT pin FROM user WHERE acc='"+acc+"'", function (err, result) {
    if (err) { console.log(err); throw err;}
    if(result.length==1 && result[0].pin==pin) {
        console.log("1 Dibe");
        res.json("1"); 
    } 
    else {
        console.log("0 Dibe");
        res.json("0");
    }
  });
}
