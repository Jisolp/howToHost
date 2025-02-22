const mysql = require('mysql2');
const connection = require('../config/db');

const createTableTable = `
    CREATE TABLE IF NOT EXISTS tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(225),
        table_number VARCHAR(10) NOT NULL,
        size INT NOT NULL,
        flexibility INT DEFAULT 0,
        status ENUM('open', 'reserved', 'occupied') DEFAULT 'open'
    );
`;

// Create the tables table
connection.query(createTableTable, (err) => {
    if (err) throw err;
    console.log("Tables table created or exists");
});
module.exports = connection;
