const mysql = require('mysql2');
const connection = require('../config/db');

const createServer = `
    CREATE TABLE IF NOT EXISTS servers(
        id INT AUTO_INCREMENET PRIMARY KEY,
        name VARCHAR(225) NOT NULL
    );
`;

connection.query(createServer, (err) => {
    if (err) throw err;
    console.log("Servers table created");
});

module.exports = connection;
