const mysql = require('mysql2');
const connection = require('../config/db');

const createReservationTable = `
    CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(225) NOT NULL,
        phone_num VARCHAR(20) NOT NULL,
        party_size INT NOT NULL,
        reservation_time DATETIME NOT NULL,
        status ENUM('Pending', 'Confirmed', 'Canceled', 'No-Show') DEFAULT 'Pending',
        table_id INT,
        FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE SET NULL
    );
`;

// Create the reservations table
connection.query(createReservationTable, (err) => {
    if (err) throw err;
    console.log("Reservations table created or exists");
});
module.exports = connection;
