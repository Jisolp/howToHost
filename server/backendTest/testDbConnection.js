const db = require('../../backend/config/db'); 

db.get('SELECT 1', (err, row) => {
    if (err) {
        console.log("DB not connected:", err);
    } else {
        console.log("DB connection successful");
    }
});
