const sqlite3 = require('sqlite3').verbose();
const db = require('../config/db');

const createReservationsTable = () => {
    const createTableSQL = `
    CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        reservation_date TEXT NOT NULL,
        number_of_guests INTEGER NOT NULL,
        table_id INTEGER,
        section_id INTEGER,
        FOREIGN KEY (table_id) REFERENCES tables(id),
        FOREIGN KEY (section_id) REFERENCES sections(id)
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
