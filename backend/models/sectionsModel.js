const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

const createSectionsTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  
        name TEXT NOT NULL UNIQUE  
    );
    `;
    db.run(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating sections table: ", err.message);
        } else {
            console.log("Sections table created or exists");
        }
    });
};

// Add a section 
const addSection = (name) => {
    const query = `INSERT INTO sections (name) VALUES (?)`;
    db.run(query, [name], function (err) {  
        if (err) {
            console.error("Error adding section: ", err.message);
        } else {
            console.log(`Section ${name} added with ID: ${this.lastID}`);  
        }
    });
};

module.exports = { createSectionsTable, addSection };
