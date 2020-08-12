
ALTER DATABASE db_mystore CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE users(
    u_id INT AUTO_INCREMENT primary key,
    u_name VARCHAR(100) ,
    u_address VARCHAR(100) ,
    u_phone INT,
    u_avatar VARCHAR(200),
    u_username VARCHAR(12),
    u_password VARCHAR(100),
    u_email VARCHAR(100)
    );

    CREATE TABLE type_products(
    tp_id INT AUTO_INCREMENT primary key,
    tp_name VARCHAR(100) 
    );
create TABLE products(
    p_id INT AUTO_INCREMENT primary key,
    p_name VARCHAR(100) ,
    p_price INT,
    p_image VARCHAR(100),
    p_description VARCHAR(1000),
    p_trademark VARCHAR(100),
    tp_id INT ,
    CONSTRAINT FK_typeproduct FOREIGN KEY (tp_id)
    REFERENCES type_products(tp_id)
    );

    
CREATE TABLE orders(
    o_id INT AUTO_INCREMENT primary key,
    u_id  INT,
    p_id  INT,
    o_amount INT,
    o_total FLOAT,
    CONSTRAINT FK_orderuser FOREIGN KEY (u_id)
    REFERENCES users(u_id),

    CONSTRAINT FK_orderproduct FOREIGN KEY (p_id)
    REFERENCES products(p_id)

    );


INSERT INTO users(u_name,u_address,u_phone,u_avatar,u_username,u_password,u_email) 
    VALUES ("Trần Thanh Phụng","Ninh Kiều - Cần Thơ",0123456789,"avatar1.jpg","Phung","Phung","Phung@gmail.com");

INSERT INTO type_products (tp_name) 
    VALUES ("Samsung");
INSERT INTO type_products (tp_name) 
    VALUES ("Huawei");
    INSERT INTO type_products (tp_name) 
    VALUES ("OnePlus");
    INSERT INTO type_products (tp_name) 
    VALUES ("Xiaomi");
    INSERT INTO type_products (tp_name) 
    VALUES ("OPPO");
    INSERT INTO type_products (tp_name) 
    VALUES ("Iphone");
    INSERT INTO type_products (tp_name) 
    VALUES ("Sony");

INSERT INTO products(p_name,p_price,p_image,p_description,p_trademark,tp_id) 
    VALUES ("Galaxy Note 10+",10000000,"i101.png","chat luong","Sam Sung",3);
    INSERT INTO products(p_name,p_price,p_image,p_description,p_trademark,tp_id) 
    VALUES ("Iphone X ",10000000,"i102.png","Chất lượng","Iphone",6);
    INSERT INTO products(p_name,p_price,p_image,p_description,p_trademark,tp_id) 
    VALUES ("Samsung Galaxy A21s",3500000,"ss1.png","Chất lượng","Sam ung",3);
