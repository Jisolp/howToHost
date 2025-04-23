import React, { useEffect, useState } from 'react';
import { getReservationsByTable } from '../../api';

function TableInfoModal({ table, onClose }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    console.log("Fetching reservation for table ID:", table.id);
    const fetchReservation = async () => {
      try {
        const res = await getReservationsByTable(table.id);
        setReservations(res.data); 
      } catch (err) {
        console.error("Error fetching reservation:", err);
      }
    };
    fetchReservation();
  }, [table]);

  const latestReservation = reservations?.[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4">Table {table.section}{table.table_number}</h2>

        {latestReservation ? (
          <div className="space-y-2">
            <p><strong>Customer:</strong> {latestReservation.customer_name}</p>
            <p><strong>Phone:</strong> {latestReservation.phone_number}</p>
            <p><strong>Time:</strong> {latestReservation.time}</p>
            <p><strong>Party:</strong> {latestReservation.party}</p>
            <p><strong>Status:</strong> {table.status}</p>
          </div>
        ) : (
          <p className="text-gray-500">No reservation found for this table.</p>
        )}
      </div>
    </div>
  );
}

export default TableInfoModal;
