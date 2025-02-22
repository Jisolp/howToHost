// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create connection to MySQL 
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Check connection 
connection.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL");

    // Create the database 
    connection.query("CREATE DATABASE IF NOT EXISTS restaurant_db", (err) => {
        if (err) throw err;
        console.log("Database 'restaurant_db' created or exists");

        // Change database
        connection.changeUser({ database: 'restaurant_db' }, (err) => {
            if (err) throw err;
            console.log("Now connected to 'restaurant_db'");
        });
    });
});

module.exports = connection;
