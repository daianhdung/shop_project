create database shop_db;
use shop_db;

CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS user(
	id int auto_increment,
    email varchar(255) unique,
    password varchar(255),
    fullname varchar(100),
    phone varchar(100),
    address varchar(100),
    role_id INT,
    primary key(id),
    foreign key(role_id) references role(id)
);

CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS brand (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT,
    name varchar(255),
    image text,
    price int,
    category_id int,
    brand_id int,
    PRIMARY KEY (id),
    foreign key(category_id) references category(id),
    foreign key(brand_id) references brand(id)
);
CREATE TABLE IF NOT EXISTS size (
    id INT AUTO_INCREMENT,
    name varchar(10),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS product_size (
	product_id int,
    size_id int,
    
    primary key(product_id,size_id),
    foreign key(product_id) references product(id),
    foreign key(size_id) references size(id)
);

CREATE TABLE IF NOT EXISTS bookmark_product(
	user_id int,
    product_id int,
    primary key(user_id, product_id),
    foreign key(user_id) references user(id),
    foreign key(product_id) references product(id)
);

CREATE TABLE IF NOT EXISTS coupon (
    id INT AUTO_INCREMENT,
    name VARCHAR(50) not null,
    rate float not null,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS status (
	id int AUTO_INCREMENT,
    name varchar(50),
    primary key(id)
);
CREATE TABLE IF NOT EXISTS p_order(
	id INT AUTO_INCREMENT,
    fee_ship int,
    coupon float,
    temp_total int,
    total float,
    user_id int,
    status_id int,
    primary key(id),
    foreign key(status_id) references status(id),
    foreign key(user_id) references user(id)
);
CREATE TABLE IF NOT EXISTS product_order (
	order_id int,
    product_id int,
    size varchar(10),
    amount int,
    price int,
    primary key(order_id,product_id, size),
    foreign key(order_id) references p_order(id),
    foreign key(product_id) references product(id)
);






INSERT INTO role(id, name, description ) VALUES (1, "ROLE_ADMIN", "Admin");
INSERT INTO role(id, name, description ) VALUES (2, "ROLE_USER", "Customer");
INSERT INTO `shop_db`.`status` (`name`) VALUES ('Cart');
INSERT INTO `shop_db`.`status` (`name`) VALUES ('Chưa xác nhận');
INSERT INTO `shop_db`.`status` (`name`) VALUES ('Xác nhận');
INSERT INTO `shop_db`.`status` (`name`) VALUES ('Hoàn thành');
INSERT INTO `shop_db`.`status` (`name`) VALUES ('Đã hủy');

INSERT INTO user( email, password, fullname, role_id ) VALUES ('admin', '$2a$10$IhrjhZcZiATnxdnUVZlxC.1sF5bflxtiFCxpaeCvYtMnykred/WR6', 'ADMIN', 1);
