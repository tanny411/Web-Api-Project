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
  
use bank;
create table user (
  `id` INT NOT NULL AUTO_INCREMENT,
  `acc` int,
  `pin` int,
  `balance` int,
  PRIMARY KEY (`id`));
#42 is Aysha
#0 is ecommerce
insert into user(acc,pin,balance)values
(2015331042,42,1000),
(2015331000,0,500),
(2015331028,28,20000);

select * from user;

drop table transactions;

create table transactions (
  `id` INT NOT NULL AUTO_INCREMENT,
  `acc` int,
  `amount` int,
  `record` varchar(100) NOT NULL,
  PRIMARY KEY (`id`));
  
select * from transactions;

insert into transactions(acc,amount,record)values (2015331042,100,'dummyString');