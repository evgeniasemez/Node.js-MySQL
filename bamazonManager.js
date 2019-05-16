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
    // console.log("connected as id " + connection.threadId);
    // connection.end();
    promptManagers();
});

function promptManagers() {
    // prompt for info about the item being put up for auction
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
            // console.log("answer", answer);
            // checkInventoryLevel(answer);
            commands(answer);
            // connection.end();
        });
}
function afterConnection() {
    connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            console.log("Product id: " + element.item_id);
            console.log("Product name: " + element.product_name);
            console.log("Product price: " + element.price);
            console.log("Product quantity: " + element.stock_quantity)
        });

        // connection.end();
        promptManagers();
    });
}

function afterConnection1() {
    connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM products WHERE  `stock_quantity` < 5 ", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            console.log("Product id: " + element.item_id);
            console.log("Product name: " + element.product_name);
            console.log("Product price: " + element.price);
            console.log("Product quantity: " + element.stock_quantity)
        });

        // connection.end();
        promptManagers();
    });
}

function promptAdd() {
    // prompt for info about the item being put up for a manager
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
            // console.log("answer", answer);
            afterConnection2(answer.addItem, answer.units);
            // console.log("answer", answer);
            // connection.end();
        });
}
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
            // connection.end();
            promptManagers();
        });
}

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
            // connection.end();
            promptManagers();
        });
}

function promptNewItem() {
    // prompt for info about the item being put up for a manager
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
            // console.log("answer", answer);
            afterConnection3(answer.addItemName, answer.addItemDepartment, answer.addItemPrice, answer.addUnits);
            // console.log("answer", answer);
            // connection.end();
        });
}

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


