var express = require('express');
var http = require('http');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(cors());  
app.listen(3003);

// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

// parse application/json
app.use(bodyParser.json())


var con = mysql.createConnection({
  host: 'mysql-host',
  user: 'root',
  password: 'root',
  database: 'db_mystore'
});

con.connect(function(err) {
  if (err) throw err;
  else
  {
    console.log('connected! Service Orders listen locahost:8083 ....');


    app.get('/orders',(req, res) => {
      let sql = "SELECT * FROM orders";
      let query = con.query(sql, (err, orders) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(orders));
      });
    });


  
    app.get('/orders/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM orders where o_id = "+id;
      let query = con.query(sql, (err, orders) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(orders));
      });
    });








  }
   
});
  






