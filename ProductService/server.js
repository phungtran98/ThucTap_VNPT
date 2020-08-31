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


    //Loại sản phẩm
    app.get('/type',(req, res) => {
      let sql = "SELECT * FROM type_products";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(type));
      });
    });
   
    //them loai
    app.post('/type',(req, res) => {
      let item =req.body.additem;
      console.log(item);
      let sql = "  INSERT INTO type_products (tp_name) VALUES ('"+item+"')";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        else{
          res.json({success:1})
          console.log("insert");
        }
      });
    });

    //update
    app.post('/type/update',(req, res) => {
      let item =req.body.updateitem;
      let id =req.body.id;
      console.log(item);
      let sql = "  UPDATE type_products SET tp_name='"+item+"'  WHERE tp_id="+id+"";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        else{
          res.json({success:1})
          console.log("update");
        }
      });
    });
    //xóa
    app.post('/type/delete',(req, res) => {
      // let item =req.body.updateitem;
      let id =req.body.id;
      // console.log(item);
      let sql = "  DELETE FROM type_products WHERE tp_id="+id+"";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        else{
          res.json({success:1})
          console.log("DELETE");
        }
      });
    });

    //lay theo id
    app.get('/type/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM type_products where tp_id = "+id;
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
    app.get('/product/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM products where p_id = "+id;
      let query = con.query(sql, (err, products) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
        // console.log(products);
      });
    });
    app.get('/getproducttype/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM products INNER join type_products  on products.tp_id = type_products.tp_id where products.tp_id = "+id;
      let query = con.query(sql, (err, products) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
        console.log(products);
      });
    });

    //thêm sản phẩm 
    app.post('/product',(req, res) => {
     
      let p_name = req.body.data.pname;
      let p_price = req.body.data.price;
      let p_image = req.body.data.image;
      let p_description = req.body.data.des;
      let tp_id = req.body.data.tpname.id;

      let sql = "INSERT INTO products(p_name,p_price,p_image,p_description,tp_id) VALUES ('"+p_name+"','"+p_price+"','"+p_image+"','"+p_description+"',"+tp_id+")";
      let query = con.query(sql, (err, product) => {
        if(err) throw err;
        else{
          res.setHeader('Content-Type', 'application/json');
          res.json({success:1})
          console.log("Thêm sản phẩm thành công!");
        }
        
        
      });
      // console.log(req.body.data);
      // console.log(tp_id);
    });

    //Sửa sản phẩm
    app.post('/product/update',(req, res) => {
     
      let p_name = req.body.data.pname;
      let p_price = req.body.data.price;
      let p_image = req.body.data.image;
      let p_description = req.body.data.des;
      let tp_id = req.body.data.tpname.id;

      let sql = "INSERT INTO products(p_name,p_price,p_image,p_description,tp_id) VALUES ('"+p_name+"','"+p_price+"','"+p_image+"','"+p_description+"',"+tp_id+")";
      let query = con.query(sql, (err, product) => {
        if(err) throw err;
        else{
          res.setHeader('Content-Type', 'application/json');
          res.json({success:1})
          console.log("Thêm sản phẩm thành công!");
        }
        
        
      });
      // console.log(req.body.data);
      // console.log(tp_id);
    });

    // xoa sản phẩm
    app.post('/product/delete',(req, res) => {
      // let item =req.body.updateitem;
      let id =req.body.id;
      // console.log(item);
      let sql = "  DELETE FROM products WHERE p_id="+id+"";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        else{
          res.json({success:1})
          console.log("DELETE");
        }
      });
    });
    








  }
   
});
  






  