var express = require('express');
var http = require('http');
var mysql = require('mysql')
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());  
app.listen(3001);


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
    console.log('connected! Service Users listen locahost:8081 ....');

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    
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


  }
   
});
  






