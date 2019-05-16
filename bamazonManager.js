var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Hunter2019$",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    promptManagers();
});
// prompt managers for action
function promptManagers() {
    inquirer
        .prompt([
            {
                name: "command",
                type: "list",
                message: "Which command would you like to run?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],

                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            commands(answer);
        });
}
// getting data from mysql for first command "View Products for Sale"
function afterConnection() {
    connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            console.log("Product id: " + element.item_id);
            console.log("Product name: " + element.product_name);
            console.log("Product price: " + element.price);
            console.log("Product quantity: " + element.stock_quantity)
        });
        promptManagers();
    });
}
// second command "View Low Inventory"
function afterConnection1() {
    connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM products WHERE  `stock_quantity` < 5 ", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            console.log("Product id: " + element.item_id);
            console.log("Product name: " + element.product_name);
            console.log("Product price: " + element.price);
            console.log("Product quantity: " + element.stock_quantity)
        });
        promptManagers();
    });
}
// prompting manager to add an inventory
function promptAdd() {
    inquirer
        .prompt([
            {
                name: "addItem",
                type: "input",
                message: "Which product would you like to update? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "units",
                type: "input",
                message: "How much inventory to add? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            afterConnection2(answer.addItem, answer.units);
        });
}
// setting third command "Add to Inventory"
function afterConnection2(item_id, stock_quantity) {
    connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${stock_quantity} WHERE ?`,
        [
            {
                item_id: item_id,
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log("Everything is under control");
            promptManagers();
        });
}
// setting fourth case "Add New Product"
function afterConnection3(product_name, department_name, price, stock_quantity) {
    connection.query('INSERT INTO products SET ?',
        {
            product_name: product_name,
            department_name: department_name,
            price: price,
            stock_quantity: stock_quantity
        },
        function (err, res) {
            if (err) throw err;
            console.log("Everything is under control");
            promptManagers();
        });
}
// prompting manager to add a new item
function promptNewItem() {
    inquirer
        .prompt([
            {
                name: "addItemName",
                type: "input",
                message: "Which product would you like to add? ",
                validate: function (value) {
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "addItemDepartment",
                type: "input",
                message: "What product's department woould you like to add? ",
                validate: function (value) {
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "addItemPrice",
                type: "input",
                message: "What product's price woould you like to add? ",
                validate: function (value) {
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "addUnits",
                type: "input",
                message: "How much inventory to add? ",
                validate: function (value) {
                    if (value) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            afterConnection3(answer.addItemName, answer.addItemDepartment, answer.addItemPrice, answer.addUnits);
        });
}
// looping throgh commands and calling for a particular function
function commands(answer) {
    if (answer.command === "View Products for Sale") {
        afterConnection();
    }
    else if (answer.command === "View Low Inventory") {
        afterConnection1();
    }
    else if (answer.command === "Add to Inventory") {
        promptAdd();
    }
    else if (answer.command === "Add New Product") {
        promptNewItem();
    }
}


