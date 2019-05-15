DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
use bamazon_db;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INTEGER,
PRIMARY KEY (item_id)
);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "APPLE COMPUTER", "ELECTRONICS", 590.99, 5);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "BANANAGRAMS", "TOYS", 12.89, 9);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "CAT LITTER", "PET SUPPLIES", 18.50, 31);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "DOG TREATS", "PET SUPPLIES", 8.69, 39);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "EARBUDS", "ELECTRONICS", 9.83, 12);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "FIRE STICK", "ELECTRONICS", 49.99, 6);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "GARDEN HOSE", "GARDEN", 25.99, 3);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "HAMMOCK", "GARDEN", 89.99, 7);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "ICE-CREAM MAKER", "KITCHEN", 42.00, 1);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "JUMPSUIT", "WOMAN'S FASHION", 250.89, 6);
select * from products;