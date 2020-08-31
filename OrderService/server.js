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


   //orders
   app.post('/orders/',(req, res) => {
    let data =req.body.data
    // console.log(data.uid);
    let sql = " INSERT INTO orders(u_id) VALUES("+data.uid+")";
    let query = con.query(sql, (err, result) => {
      if(err) throw err;  
      else{
        let sql1 = " INSERT INTO orders_detail(o_id,p_id,od_qty,od_total) VALUES("+result.insertId+","+data.up+","+data.qty+","+data.total+")";
        let query = con.query(sql1, (err, result) => {
          if(err) throw err;  
          res.json({success:1})
          console.log("DELETE");
        })
       
      }
    });
  });

  app.get('/orders',(req, res) => {
    let sql = "select * from orders inner join  users  on users.u_id = orders.u_id inner join orders_detail on orders_detail.o_id = orders.o_id inner join products on products.p_id = orders_detail.p_id";
    let query = con.query(sql, (err, type) => {
      if(err) throw err;
      else{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(type));
        console.log(type);
      }
    });
  });

  app.post('/orders/detail',(req,res)=>{
   let id = req.body.id
   let sql = "  DELETE FROM orders_detail WHERE o_id="+id+"";
    let query = con.query(sql, (err, type) => {
      if(err) throw err;
      else{
        res.json({success:1})
        console.log("DELETE");
      }
    });
  })








  }
   
});
  






