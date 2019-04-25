create database ecommerce;
create database bank;
create database supplier;
use ecommerce;
create table user (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  `acc` VARCHAR(45),
  `pin` int,
  PRIMARY KEY (`id`));
insert into user(name,pass)values
('Aysha Kamal','spass'),
('Ripul Sir','tpass'),
('Anisur Rahman','apass');

select * from user;

create table products (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `cost` int NULL,
  PRIMARY KEY (`id`));
  
insert into products(name,cost)values
('Almonds',20),
('Cashews',30),
('Pistachios',40);

select * from products;

create table cart (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NULL,
  `product` VARCHAR(45) NULL,
  `cost` int NULL,
  `quantity` int NULL,
  PRIMARY KEY (`id`));
  