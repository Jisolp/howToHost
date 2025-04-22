const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');
//check if res id is needed 
const createReservationsTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        time TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        party INTEGER NOT NULL,
        status TEXT CHECK(status IN ('pending', 'confirm', 'no-show','canceled')) DEFAULT 'pending',
        isWalkIn INTEGER CHECK (isWalkIn IN (0,1)) NOT NULL,
        table_id INTEGER,
        server_id INTEGER,
        FOREIGN KEY (table_id) REFERENCES tables(id),
        FOREIGN KEY (server_id) REFERENCES servers(id)
    )`;

    db.run(createTableSQL, (err) => {
        if (err) {
            console.error("Error creating reservations table: ", err.message);
        } else {
            console.log("Reservations table created or already exists.");
        }
    });
};

module.exports = { createReservationsTable };
