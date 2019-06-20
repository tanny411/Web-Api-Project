var util = require('util');
var mysql = require('mysql');

module.exports = {
    recieve : recieve
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("use supplier", function (err, result) {
    if (err) throw err;
  });
});


function recieve(req, res) {
  console.log("supplier recieved trasaction record!")
  var acc = req.body.Account;
  var amt = req.body.Amount;
  var rec = req.body.Record;
  var items = req.body.Items;
  obj = {
    'From Account' : acc,
    Record : rec,
    Amount : amt,
    'To Account' : 2015331028
  }
  //validate record from bank
//   $.ajax({
//     url: "http://localhost:3000/verify",
//     contentType: "application/json",
//     type: "POST",
//     data: JSON.stringify(obj),
//     success: function (result) {
//         res.json(result);
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//         res.json("0");
//     }
//   });
  funcOne(res);
}

function funcOne(res) { 
    var request = require('request');
    request.post("http://localhost:3000/verify", {json: true, body: obj}, function(err, response, body) {
    console.log(response.statusCode + "  " + body);    
    if (!err && response.statusCode === 200) {
            res.json(body);
        }
        else { res.json("0");}
    });
  }