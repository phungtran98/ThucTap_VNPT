var express = require('express');
var http = require('http');
var mysql = require('mysql')
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.use(cors());  
// parse application/json
app.use(bodyParser.json())

app.listen(3002);




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
    console.log('connected! Service Products listen locahost:8082 ....');


    // app.get('/products',(req, res) => {
    //   let sql = "SELECT * FROM products";
    //   let query = con.query(sql, (err, products) => {
    //     if(err) throw err;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.end(JSON.stringify(products));
    //   });
    // });


  
    // app.get('/products/:id',(req, res) => {
    //   let id =req.params.id;
    //   let sql = "SELECT * FROM products where p_id = "+id;
    //   let query = con.query(sql, (err, products) => {
    //     if(err) throw err;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.end(JSON.stringify(products));
    //   });
    // });


    // app.get('/type-products',(req, res) => {
    //   let sql = "SELECT * FROM type_products";
    //   let query = con.query(sql, (err, type) => {
    //     if(err) throw err;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.end(JSON.stringify(type));
    //   });
    // });


  
    // app.get('/type-products/:id',(req, res) => {
    //   let id =req.params.id;
    //   let sql = "SELECT * FROM type_products where tp_id = "+id;
    //   let query = con.query(sql, (err, type_products) => {
    //     if(err) throw err;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.end(JSON.stringify(type_products));
    //   });
    // });

    //Loại sản phẩm
    app.get('/type',(req, res) => {
      let sql = "SELECT * FROM type_products";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(type));
      });
    });
   

    //Sản Phẩm
    app.get('/product',(req, res) => {
      let sql = "SELECT * FROM products";
      let query = con.query(sql, (err, product) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(product));
        console.log(JSON.stringify(product));
      });
    });
    app.get('/products/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM products where p_id = "+id;
      let query = con.query(sql, (err, products) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
        // console.log(products);
      });
    });








  }
   
});
  






  