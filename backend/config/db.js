require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

// SQLite connection (create the file if it doesn't exist)
const db = new sqlite3.Database(process.env.DB_PATH || './restaurant_db.sqlite', (err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
        return;
    }
    console.log("Connected to SQLite database");
    db.run("PRAGMA foreign_keys = ON"); 
});

module.exports = db;
