const db = require('../config/db');

async function createTable({ section, table_number, size, flexibility = 0, status = 'open' }) {
    if (!section || !table_number || !size) {
        throw new Error("Missing required table fields");
    }

    const query = 'INSERT INTO tables (section, table_number, size, flexibility, status) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.run(query, [section, table_number, size, flexibility, status], function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
        });
    });
}

async function getTables() {
    const query = `
        SELECT tables.*, servers.name AS server_name 
        FROM tables 
        LEFT JOIN servers ON tables.server_id = servers.id
    `;
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function getTableByID(id) {
    const query = `
        SELECT tables.*, servers.name AS server_name 
        FROM tables 
        LEFT JOIN servers ON tables.server_id = servers.id 
        WHERE tables.id = ?
    `;
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function updateTable(id, fields) {
    const updates = [];
    const values = [];

    const validStatuses = ['open', 'reserved', 'occupied'];

    if (fields.status) {
        if (!validStatuses.includes(fields.status)) {
            throw new Error("Invalid table status");
        }
        updates.push('status = ?');
        values.push(fields.status);
    }

    if (typeof fields.flexibility !== 'undefined') {
        updates.push('flexibility = ?');
        values.push(fields.flexibility);
    }
    if (typeof fields.server_id !== 'undefined') {
        updates.push('server_id = ?');
        values.push(fields.server_id);
      }      

    if (updates.length === 0) {
        throw new Error("No valid fields to update");
    }

    values.push(id);

    const query = `
        UPDATE tables
        SET ${updates.join(', ')}
        WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
        db.run(query, values, function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}
async function deleteTable(id) {
    return new Promise((resolve, reject) => {
      const deleteReservationsQuery = `DELETE FROM reservations WHERE table_id = ?`;
      const deleteTableQuery = `DELETE FROM tables WHERE id = ?`;
  
      db.run(deleteReservationsQuery, [id], function (resErr) {
        if (resErr) return reject(resErr);
  
        db.run(deleteTableQuery, [id], function (tableErr) {
          if (tableErr) return reject(tableErr);
          resolve(this.changes);
        });
      });
    });
  }
// async function deleteTable(id) {
//     const query = 'DELETE FROM tables WHERE id = ?';

//     const existingReservations = await getAll(`SELECT * FROM reservations WHERE table_id = ?`, [id]);

//     if (existingReservations.length > 0) {
//       throw new Error("This table has active reservations. Please delete them first.");
//     }
  
//     return new Promise((resolve, reject) => {
//         db.run(query, [id], function (err) {
//             if (err) reject(err);
//             else resolve(this.changes);
//         });
//     });
// }
function getAll(query, params = []) {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
module.exports = {
    createTable,
    getTables,
    getTableByID,
    updateTable,
    deleteTable
};
