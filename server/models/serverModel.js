const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

// Function to create the servers table
const createServerTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS servers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
    `;
    
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating servers table: ", err.message);
        } else {
            console.log("Servers table created or exists");
        }
    });
};

// Function to add a new server
const addServer = (name) => {
    const query = `INSERT INTO servers (name) VALUES (?)`;
    db.run(query, [name], function (err) {
        if (err) {
            console.error("Error adding server: ", err.message);
        } else {
            console.log(`Server '${name}' added with ID: ${this.lastID}`);
        }
    });
};

module.exports = { createServerTable, addServer };
