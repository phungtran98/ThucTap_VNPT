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

    
create TABLE orders(
    o_id INT AUTO_INCREMENT primary key,
    u_id  INT,
 
    CONSTRAINT FK_user FOREIGN KEY (u_id)
    REFERENCES users(u_id)
    );

create TABLE orders_detail(
    p_id  INT,
    o_id INT,
    od_qty INT,
    od_total INT,
    CONSTRAINT FK_orders FOREIGN KEY (o_id)
    REFERENCES orders(o_id),
    CONSTRAINT FK_products FOREIGN KEY (p_id)
    REFERENCES products(p_id)
    );