var util = require('util');
var mysql = require('mysql');

module.exports = {
  Login: Login,
  addAcc:addAcc,
  buy:buy
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("use ecommerce", function (err, result) {
    if (err) throw err;
  });
});

function Login(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.body.username;
  var pass = req.body.password;
  console.log('Request Ashche')
  //var hello = util.format('Hello, %s!, Your password is %s.', name, pass);
  con.query("SELECT pass,name FROM user WHERE name='"+name+"'", function (err, result) {
    if (err) throw err;
    if(result.length==1 && result[0].pass==pass) {
      
      res.json("HI "+result[0].name);
    } 
    else res.status("403").json("Not Verified");
  });
}

function addAcc(req,res){
 
}

function buy(req,res){
 
}
