import React, { useEffect, useState } from 'react';
import { getReservations, deleteReservation } from '../../api';
import ReservationCard from './ReservationCard';
import UpdateReservation from './UpdateReservation';
import CreateReservation from './CreateReservation';
import { fetchTables } from '../../api';

function ReservationList({ reservations, fetchReservations, fetchTables }) {
  // const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // const fetchReservations = async () => {
  //   try {
  //     const res = await getReservations();
  //     setReservations(res.data.sort((a, b) => a.time.localeCompare(b.time))); 
  //   } catch (err) {
  //     console.error('Error fetching reservations', err);
  //   }
  // };
  

  const handleDelete = async (reservation) => {
    if (confirm(`Delete reservation for ${reservation.customer_name}?`)) {
      try {
        await deleteReservation(reservation.id);
        fetchReservations(); 
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      
      <CreateReservation onCreated={async() => {
        await fetchReservations();
        await fetchTables();
      }}
      />  

      <div className="grid gap-4 mt-6">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <ReservationCard 
              key={res.id} 
              reservation={res} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="text-gray-600">No reservations yet.</div>
        )}
      </div>

      {showEditModal && (
        <UpdateReservation 
          reservation={selectedReservation}
          onClose={() => setShowEditModal(false)}
          onUpdated={fetchReservations}
        />
      )}
    </div>
  );
}

export default ReservationList;