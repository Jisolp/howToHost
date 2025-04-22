const db = require('../config/db');
const allocateTable = require('../utils/allocateTable');

const searchReservationOptions = async (req, res) => {
    const { party, time, isWalkIn, excludedTables = [] } = req.body;

  try {
    let tables = await getAll('SELECT * FROM tables');

    // Filter out excluded tables
    tables = tables.filter(t => !excludedTables.includes(t.id));
    const reservations = await getAll('SELECT * FROM reservations');
    const servers = await getAll('SELECT * FROM servers');

    let actualTime = time;

    if (isWalkIn) {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      actualTime = `${hours}:${minutes} ${ampm}`;
    }

    const allocation = allocateTable(tables, reservations, servers, party, actualTime, isWalkIn);

    if (!allocation || allocation.message) {
      return res.status(400).json({ message: "No available table" });
    }

    const table = await getOne('SELECT * FROM tables WHERE id = ?', [allocation.table_id]);
    const server = await getOne('SELECT * FROM servers WHERE id = ?', [allocation.server_id]);

    if (!table || !server) {
      return res.status(500).json({ message: "Table or server not found" });
    }

    // Check if table has future reservations (within next 2 hours)
    const upcomingReservation = reservations.find(res => res.table_id === table.id && res.time > actualTime);

    let warning = null;
    if (upcomingReservation) {
      warning = `Warning: This table is reserved again at ${upcomingReservation.time}`;
    }

    res.json({
      suggestedTableId: allocation.table_id,
      suggestedServerId: allocation.server_id,
      tableNumber: table.table_number,
      section: table.section,
      serverName: server.name,
      warning: warning,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

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
  searchReservationOptions
};
