const db = require('../config/db');

async function createServer(name) {
    if (!name) throw new Error("Server name is required");

    const query = 'INSERT INTO servers (name) VALUES (?)';
    return new Promise((resolve, reject) => {
        db.run(query, [name], function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
}

async function getServers() {
    const query = 'SELECT * FROM servers';
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getServerByID(id) {
    const query = 'SELECT * FROM servers WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}
async function getServerTableCount(id) {
    const query = 'SELECT COUNT(*) as count FROM tables WHERE server_id = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row.count);
      });
    });
  }

async function deleteServer(id) {
    const query = 'DELETE FROM servers WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

module.exports = {
    createServer,
    getServers,
    getServerByID,
    getServerTableCount,
    deleteServer
};
