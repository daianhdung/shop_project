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
    price int,
    category_id int,
    brand_id int,
    PRIMARY KEY (id),
    foreign key(category_id) references category(id),
    foreign key(brand_id) references brand(id)
);
CREATE TABLE IF NOT EXISTS image_product (
    id INT AUTO_INCREMENT,
    name varchar(255),
    product_id int,
    PRIMARY KEY (id),
    foreign key(product_id) references product(id)
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

INSERT INTO brand(name) VALUES ("Adidas");
INSERT INTO brand(name) VALUES ("Nike");
INSERT INTO brand(name) VALUES ("Jordan");
INSERT INTO brand(name) VALUES ("Puma");
INSERT INTO brand(name) VALUES ("Converse");
INSERT INTO brand(name) VALUES ("Vans");
INSERT INTO brand(name) VALUES ("Adidas");

INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas FLB_Runner Shoes - Black (CQ1970)', "699000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Superstar Slipon Core Black (S81337/BZ0112)', "1550000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Continental 80 Shoes - Crystal White (EF2101)', "1290000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Stan Smith Green (M20324)', "1550000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Alphabounce Beyond Core Black W (CG5581)', "999000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Superstar Gold Label (C77124/EG4958)', "1850000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Superstar Gold Label (FV3284)', "1650000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Ultraboost 4.0 Shoes - Triple Black (EH1420)', "2990000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Adidas Ultraboost Reflective Shoes - Coreblack (EG8105)', "2490000", 1);
INSERT INTO product(name, price, brand_id ) VALUES ('
Nike Court Legacy White Black Canvas (CW6539-101)', "1450000", 2);
INSERT INTO product(name, price, brand_id ) VALUES ('
Nike Court Legacy White Desert Ochre (DA5380-102)', "1450000", 2);
INSERT INTO product(name, price, brand_id ) VALUES ('
Nike Zoom Gravity Metallic Silver (BQ3202-001 / BQ3203-002)', "999000", 2);
INSERT INTO product(name, price, brand_id ) VALUES ('
Nike Court Legacy White Desert Ochre Next Nature (DH3162-100)', "1850000", 2);
INSERT INTO product(name, price, brand_id ) VALUES ('
Nike Blazer Low 77 Vintage (DA6364-101)', "2450000", 2);
INSERT INTO product(name, price, brand_id ) VALUES ('
Jordan 1 Low Vintage Grey (553558-053)', "5150000", 3);
INSERT INTO product(name, price, brand_id ) VALUES ('
Jordan 1 Low Shadow Toe - Smoke V4 (553558-052)', "5650000", 3);
INSERT INTO product(name, price, brand_id ) VALUES ('
Jordan 1 Retro High OG Bordeaux (575441-611)', "3990000", 3);
INSERT INTO product(name, price, brand_id ) VALUES ('
Jordan 1 Low Bred Toe (553558-612)', "3990000", 3);
INSERT INTO product(name, price, brand_id ) VALUES ('
Jordan 1 Low White Wolf Grey (DC0774-105)', "7050000", 3);
INSERT INTO product(name, price, brand_id ) VALUES ('
Puma Smash Vulc Mule - Black (309680-02)', "999000", 4);
INSERT INTO product(name, price, brand_id ) VALUES ('
Puma Smash Vulc Mule - White (309680-01)', "999000", 4);
INSERT INTO product(name, price, brand_id ) VALUES ('
Puma Bari Mule Black (371318-01)', "999000", 4);


INSERT INTO image_product(name, product_id ) VALUES ('
adidas-fub-runner1.webp' ,1);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-fub-runner2.webp' ,1);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-fub-runner3.webp' ,1);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-fub-runner4.webp' ,1);


INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-slipon1.webp' ,2);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-slipon2.webp' ,2);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-slipon3.webp' ,2);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-slipon4.webp' ,2);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-continental-shoes1.webp' ,3);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-continental-shoes2.webp' ,3);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-continental-shoes3.webp' ,3);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-continental-shoes4.webp' ,3);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-stan-smith-green1.webp' ,4);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-stan-smith-green2.webp' ,4);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-stan-smith-green3.webp' ,4);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-stan-smith-green4.webp' ,4);


INSERT INTO image_product(name, product_id ) VALUES ('
adidas-alphabounce-beyond1.webp' ,5);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-alphabounce-beyond2.webp' ,5);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-alphabounce-beyond3.webp' ,5);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-alphabounce-beyond4.webp' ,5);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-label1.webp' ,6);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-label2.webp' ,6);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-label3.webp' ,6);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-label4.webp' ,6);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-labelFV3284-1.webp' ,7);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-labelFV3284-2.webp' ,7);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-labelFV3284-3.webp' ,7);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-superstar-gold-labelFV3284-4.webp' ,7);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-shoes-1.webp' ,8);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-shoes-2.webp' ,8);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-shoes-3.webp' ,8);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-shoes-4.webp' ,8);

INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-reflective-shoes1.webp' ,9);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-reflective-shoes2.webp' ,9);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-reflective-shoes3.webp' ,9);
INSERT INTO image_product(name, product_id ) VALUES ('
adidas-ultraboost-reflective-shoes4.webp' ,9);

INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-black-canvas1.webp' ,10);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-black-canvas2.webp' ,10);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-black-canvas3.webp' ,10);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-black-canvas4.webp' ,10);

INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre1.webp' ,11);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre2.webp' ,11);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre3.webp' ,11);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre4.webp' ,11);

INSERT INTO image_product(name, product_id ) VALUES ('
nike-zoom-gravity-metallic-silver1.webp' ,12);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-zoom-gravity-metallic-silver2.webp' ,12);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-zoom-gravity-metallic-silver3.webp' ,12);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-zoom-gravity-metallic-silver4.webp' ,12);

INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre11.webp' ,13);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre12.webp' ,13);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre13.webp' ,13);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-court-legacy-white-desert-ochre14.webp' ,13);

INSERT INTO image_product(name, product_id ) VALUES ('
nike-blazer-low77-vintage1.webp' ,14);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-blazer-low77-vintage2.webp' ,14);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-blazer-low77-vintage3.webp' ,14);
INSERT INTO image_product(name, product_id ) VALUES ('
nike-blazer-low77-vintage4.webp' ,14);

INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-vintage-grey1.webp' ,15);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-vintage-grey2.webp' ,15);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-vintage-grey3.webp' ,15);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-vintage-grey4.webp' ,15);

INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-shadow-toe1.webp' ,16);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-shadow-toe2.webp' ,16);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-shadow-toe3.webp' ,16);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-shadow-toe4.webp' ,16);

INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-retro-high-og1.webp' ,17);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-retro-high-og2.webp' ,17);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-retro-high-og3.webp' ,17);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-retro-high-og4.webp' ,17);

INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-bred-toe1.webp' ,18);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-bred-toe2.webp' ,18);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-bred-toe3.webp' ,18);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-bred-toe4.webp' ,18);

INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-white-wolf-grey1.webp' ,19);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-white-wolf-grey2.webp' ,19);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-white-wolf-grey3.webp' ,19);
INSERT INTO image_product(name, product_id ) VALUES ('
jordan1-low-white-wolf-grey4.webp' ,19);

INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-black1.webp' ,20);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-black2.webp' ,20);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-black3.webp' ,20);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-black4.webp' ,20);

INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-white1.webp' ,21);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-white2.webp' ,21);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-white3.webp' ,21);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-smash-vulc-mule-white4.webp' ,21);

INSERT INTO image_product(name, product_id ) VALUES ('
puma-bari-mule-black1.webp' ,22);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-bari-mule-black2.webp' ,22);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-bari-mule-black3.webp' ,22);
INSERT INTO image_product(name, product_id ) VALUES ('
puma-bari-mule-black4.webp' ,22);

