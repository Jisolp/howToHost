const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

// Create the tables table
const createTableTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT,
        table_number TEXT NOT NULL,
        size INTEGER NOT NULL,
        flexibility INTEGER DEFAULT 0,
        status TEXT CHECK(status IN ('open', 'reserved', 'occupied')) DEFAULT 'open'
    );
    `;
    
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating tables table: ", err.message);
        } else {
            console.log("Tables table created or exists");
        }
    });
};

// Function to add a new table 
const addTable = (section, table_number, size, flexibility, status) => {
    const query = `INSERT INTO tables (section, table_number, size, flexibility, status) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [section, table_number, size, flexibility, status], function (err) {
        if (err) {
            console.error("Error adding table: ", err.message);
        } else {
            console.log(`Table ${table_number} added with ID: ${this.lastID}`);
        }
    });
};

module.exports = { createTableTable, addTable };
