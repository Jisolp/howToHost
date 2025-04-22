const db = require('../config/db');

async function createSection(name) {
    if (!name) throw new Error("Section name is required");

    const query = 'INSERT INTO sections (name) VALUES (?)';
    return new Promise((resolve, reject) => {
        db.run(query, [name], function(err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
}

async function getSections() {
    const query = 'SELECT * FROM sections';
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getSectionByID(id) {
    const query = 'SELECT * FROM sections WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function deleteSection(id) {
    const query = 'DELETE FROM sections WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(query, [id], function(err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

module.exports = {
    createSection,
    getSections,
    getSectionByID,
    deleteSection
};
