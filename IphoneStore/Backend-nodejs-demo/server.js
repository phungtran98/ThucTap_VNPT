var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors());
app.listen(3000);



// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

// parse application/json
app.use(bodyParser.json())



var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

con.connect(function(err) {
  if (err) throw err;
  else
  {
    console.log('connected! Service Users listen locahost:3000 ....');

    // app.use(function(req, res, next) {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });

    app.get('/users',(req, res) => {
      let sql = "SELECT * FROM users where u_id <> 10";
      let query = con.query(sql, (err, users) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
      });
    });

    app.get('/users/:id',(req, res) => {
      let id =req.params.id;
      let sql = "SELECT * FROM users where u_id = "+id;
      let query = con.query(sql, (err, users) => {
        if(err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
      });
    });

    app.post('/users',urlencodedParser,(req, res) => {
     
        // let u_name = req.body.name;
        // let lastName = u_name.split(' ').slice(-1).join(' ');
        // let u_address = req.body.address;
        // let u_phone = req.body.phone;
        // let u_avatar = "avatar1.jpg";
        // let u_email = req.body.email;
        // let u_username = lastName;
        // let u_password = lastName;
        let data =req.body.data;
        let sql = " INSERT INTO users(u_name,u_address,u_phone,u_avatar,u_username,u_password,u_email) VALUES ('"+data.u_name+"','"+data.u_address+"',"+data.u_phone+",'"+data.u_avatar+"','"+data.u_username+"','"+data.u_password+"','"+data.u_email+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
        console.log(data);
        
        // res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify(data));
        // res.send('welcome, ' + req.body);
      });

      //xóa
    app.post('/users/delete',(req, res) => {
      // let item =req.body.updateitem;
      let id =req.body.id;
      // console.log(item);
      let sql = "  DELETE FROM users WHERE u_id="+id+"";
      let query = con.query(sql, (err, type) => {
        if(err) throw err;
        else{
          res.json({success:1})
          console.log("DELETE");
        }
      });
    });


    //login

    app.post('/login',urlencodedParser,(req,res) => {

      // let user = 'phug';
      // let pass = 'phung';
      let user = req.body.userName;
      let pass = req.body.passWord;
      // console.log(user);
      let post = {u_username:user, u_password:pass};
      console.log(post);
      
      let sql = "select u_id from users where u_username='"+user+"' and u_password='"+pass+"'";
      con.query(sql, function (err, result) {
        if (err) throw err;
       else{  
         if(result[0].u_id != '')
         {
          res.json({success:1,id:result[0].u_id});//nếu thêm thành công trả về 1;
         }
         else
         {
          console.log("2: "+result[0].u_id);
          res.json({success:0});
         }

        // console.log(result[0].temp);
        console.log(result[0].u_id);  
        
         
        
       }
      });
     
    });
    

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
  






