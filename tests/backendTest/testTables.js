const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./restaurant_db.sqlite');

db.all("SELECT name FROM sqlite_master WHERE type='table';", (err,rows) =>{
    if (err){
        console.log("Error fetching tables:", err);
    }
    else{
        console.log("Tables in the database:");
        rows.forEach((row) => {
            console.log(row.name);
        });
    }
    db.close((err) => {
        if(err){
            console.log("Error closing the db:", err);
        }
    });
});