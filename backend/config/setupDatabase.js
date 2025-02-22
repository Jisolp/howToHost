const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH || './restaurant_db.sqlite');

const {createReservationsTable} = require('../models/resModel'); 
const {createSectionsTable} = require('../models/sectionsModel');
const {createServerTable} = require('../models/serverModel');
const {createTableTable} = require('../models/tableModel');

db.serialize(() => {
    createReservationsTable();
    createSectionsTable();
    createServerTable();
    createTableTable();
});

db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, rows) => {
    if (err) {
        console.error("Error fetching tables:", err);
    } else {
        console.log("Tables in database:", rows.map(row => row.name));
    }
    db.close();
});
