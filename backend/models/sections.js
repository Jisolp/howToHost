const mysql = require('mysql2');
const connection = require('../config/db');

const createSectionsTable = `
    CREATE TABLE IF NOT EXISTS sections (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(225) NOT NULL UNIQUE
    );
`;

connection.query(createSectionsTable, (err) => {
    if (err) throw err;
    console.log("Sectioned tables");
});

const addSection = (name) => {
    const query = `INSERT INTO sections (name) VALUES (?)`;
    connection.query(query, [name], (err,result) => {
        if (err) throw err;
        console.log(`Section ${name} added`)
    });
};
module.exports = { addSection };
