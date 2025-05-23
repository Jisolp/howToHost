const resService = require('../services/resService');

const addReservation = async (req, res) => {
    try {
        const id = await resService.createReservation({
            ...req.body,
            isWalkIn: req.body.isWalkIn || false, // default to true
        });
        res.status(201).json({ message: "Reservation created", id });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await resService.getReservations();
        res.status(200).json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getReservationsByTableId = async (req, res) => {
  const { tableId } = req.params;
  try {
    const getReservationsByTableId = async (req, res) => {
        const { tableId } = req.params;
      
        const query = `
          SELECT reservations.*, servers.name AS server_name
          FROM reservations
          LEFT JOIN servers ON reservations.server_id = servers.id
          WHERE reservations.table_id = ?
          ORDER BY reservations.id DESC
        `;
      
        db.all(query, [tableId], (err, rows) => {
          if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Database error" });
          }
      
          res.status(200).json(rows);
        });
      };
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const getReservationByID = async (req, res) => {
    try {
        const reservation = await resService.getReservationByID(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

const updateReservation = async (req, res) => {
    try {
        const changes = await resService.updateReservation(req.params.id, req.body);
        if (changes === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const changes = await resService.deleteReservation(req.params.id);
        if (changes === 0) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};


module.exports = {
    addReservation,
    getReservations,
    getReservationByID,
    updateReservation,
    deleteReservation,
    getReservationsByTableId
};
