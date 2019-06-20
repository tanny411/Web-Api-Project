var util = require('util');
var mysql = require('mysql');

module.exports = {
  Login: Login,
  addAcc:addAcc,
  buy:buy,
  fetch:fetch
};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
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
  console.log('Login Request Ashche')
  //var hello = util.format('Hello, %s!, Your password is %s.', name, pass);
  con.query("SELECT pass,name,pin FROM user WHERE name='"+name+"'", function (err, result) {
    if (err) throw err;
    if(result.length==1 && result[0].pass==pass) {
      
      //res.json("HI "+result[0].name);
      console.log(result[0].pin);
      if(result[0].pin!=null) res.json("2");
      else res.json("1");
    } 
    else res.json("Not Verified");
  });
}

function addAcc(req,res){
  var acc = req.body.Acc;
  var pin = req.body.Pin;
  var name = req.body.Name;
  console.log('AddAcc Request Ashche')
  var sql = "UPDATE user SET acc = "+acc+" , pin="+pin+" WHERE name='"+name+"'";
  con.query(sql, function (err, result) {
    if (err) {
      res.send(400).json("Database Error");
      throw err;
    }
    else{
      console.log(result);
      res.json(result.affectedRows);
    }
  });
}

function fetch(req, res) {
  var name = req.body.name;
  console.log('Fetch Request Ashche')
  con.query("SELECT acc,pin FROM user WHERE name='"+name+"'", function (err, result) {
    if (err) throw err;
    obj={
      acc:Number(result[0].acc),
      pin:Number(result[0].pin),
    };
    res.json(obj);
  });
}

function buy(req,res){
 
}
