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
      let sql = "SELECT * FROM users";
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
     
        let u_name = req.body.name;
        let lastName = u_name.split(' ').slice(-1).join(' ');
        let u_address = req.body.address;
        let u_phone = req.body.phone;
        let u_avatar = "avatar1.jpg";
        let u_email = req.body.email;
        let u_username = lastName;
        let u_password = lastName;
        let data =[u_name,u_address,u_phone,u_avatar,u_username,u_password,u_email];
        let sql = " INSERT INTO users(u_name,u_address,u_phone,u_avatar,u_username,u_password,u_email)  VALUES(?) ";
        con.query(sql,[data], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
        // console.log(data);
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        // res.send('welcome, ' + req.body);
      });


      //login

    app.post('/login',urlencodedParser,(req,res) => {

      let user = req.body.userName;
      let pass = req.body.passWord;
      // console.log(user);
      let post = {u_username:user, u_password:pass};
      console.log(post);
      
      let sql = "select u_id from users where u_username='"+user+"' and u_password='"+pass+"'";
      con.query(sql, function (err, result) {
        if (err) throw err;
       else{  
         if(result[0].u_id > 0)
         {
          res.json({success:1,id:result[0].u_id});//nếu thêm thành công trả về 1;
          console.log(result);
         }
         else
         {
          res.json({success:0});
         }

        // console.log(result[0].temp);
        console.log(result[0].u_id);  
        
         
        
       }
      });
     
    });


  }
   
});
  






