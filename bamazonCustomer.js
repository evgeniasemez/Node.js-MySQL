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
    console.log("connected as id " + connection.threadId);
    // connection.end();
    afterConnection();
});
function afterConnection() {
    connection.query("SELECT `item_id`, `product_name`, `price` FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
        promptUsers();
    });
}

function promptUsers() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Enter the ID of the product you would like to buy",
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
                message: "How many units of the product would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            console.log("answer", answer);
        });
}
function checkInventoryLevel(answer) {
    connection.query("SELECT `stock_quantity` FROM products WHERE ?",
    {
        item_id: answer.item,
    },
    function (err, res) {
        if (err) throw err;
        console.log(res);
    });
}