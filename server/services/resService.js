const db = require('../config/db');
const allocateTable = require('../utils/allocateTable');
const { isValidName, isValidParty, isValidPhoneNum, isValidTime } = require('../utils/resValidation');

async function createReservation({ customer_name, phone_number, time, party, isWalkIn, table_id, server_id }) {
    
    
  if (!isWalkIn && !isValidName(customer_name)) throw new Error("Invalid customer name");
  if (!isValidParty(party)) throw new Error("Invalid party size");
  if (!isWalkIn && !isValidPhoneNum(phone_number)) throw new Error("Invalid phone number");
  if (!isWalkIn && !isValidTime(time)) throw new Error("Invalid time format");

  const tables = await getAll('SELECT * FROM tables');
  const reservations = await getAll('SELECT * FROM reservations');
  const servers = await getAll('SELECT * FROM servers');

  // If no table/server passed, allocate
  if (!table_id || !server_id) {
    const allocation = allocateTable(tables, reservations, servers, party, time, isWalkIn);
    if (!allocation || allocation.message) throw new Error("No available table");

    table_id = allocation.table_id;
    server_id = allocation.server_id;
  }

  const insertReservationQuery = `
    INSERT INTO reservations (customer_name, phone_number, time, party, table_id, server_id, isWalkIn)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.run(insertReservationQuery, [customer_name, phone_number, time, party, table_id, server_id, isWalkIn ? 1 : 0], function (err) {
      if (err) return reject(err);

      const newStatus = isWalkIn ? 'occupied' : 'reserved';
      const updateTableQuery = `UPDATE tables SET status = ? WHERE id = ?`;

      db.run(updateTableQuery, [newStatus, table_id], function (err2) {
        if (err2) return reject(err2);
        resolve({ reservationID: this.lastID, tableID: table_id, serverID: server_id });
      });
    });
  });
}


async function getReservations() {
    const query = `
    SELECT 
      r.*, 
      t.section AS table_section, 
      t.table_number AS table_number, 
      s.name AS server_name
    FROM reservations r
    LEFT JOIN tables t ON r.table_id = t.id
    LEFT JOIN servers s ON r.server_id = s.id
    WHERE r.isWalkIn = 0
    ORDER BY r.time ASC
  `;
    return getAll(query);
}

async function getReservationByID(id) {
    const query = `
    SELECT 
      r.*, 
      t.section AS table_section, 
      t.table_number AS table_number, 
      s.name AS server_name
    FROM reservations r
    LEFT JOIN tables t ON r.table_id = t.id
    LEFT JOIN servers s ON r.server_id = s.id
    WHERE r.id = ?
  `;
    return getOne(query, [id]);
}

async function updateReservation(id, fields) {
    const updates = [];
    const values = [];

    if (fields.customer_name) {
        updates.push("customer_name = ?");
        values.push(fields.customer_name);
    }
    if (fields.phone_number) {
        updates.push("phone_number = ?");
        values.push(fields.phone_number);
    }
    if (fields.time) {
        updates.push("time = ?");
        values.push(fields.time);
    }
    if (fields.party) {
        updates.push("party = ?");
        values.push(fields.party);
    }
    if (fields.response) {
        const normalized = fields.response.trim().toLowerCase();
        if (["y", "yes", "confirm"].includes(normalized)) {
            updates.push("status = ?");
            values.push("confirm");
        } else if (["n", "no", "cancel"].includes(normalized)) {
            updates.push("status = ?");
            values.push("canceled");
        } else {
            throw new Error("Invalid response: Reply with Y/N");
        }
    }
    if (fields.status) {
        updates.push('status = ?');
        values.push(fields.status);
      }

    if (updates.length === 0) {
        throw new Error("No fields to update");
    }

    values.push(id);

    const query = `UPDATE reservations SET ${updates.join(', ')} WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(query, values, function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}

async function deleteReservation(id) {
    const query = `DELETE FROM reservations WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.run(query, [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
}

// Helpers
function getAll(query) {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function getOne(query, params) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

module.exports = {
    createReservation,
    getReservations,
    getReservationByID,
    updateReservation,
    deleteReservation
};
