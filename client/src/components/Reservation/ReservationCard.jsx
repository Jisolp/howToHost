import React from 'react';

function ReservationCard({ reservation, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white flex flex-col gap-2">
      <div className="font-semibold text-lg">{reservation.customer_name}</div>
      <div className="text-sm text-gray-600">
        <div>{reservation.phone_number}</div>
        <div>{reservation.time}</div>
        <div>Party: {reservation.party}</div>
        <div>Table:{ reservation.table_section}{reservation.table_number}</div>
        <div>Status: <span className="capitalize">{reservation.status}</span></div>
        {reservation.isWalkIn ? <div className="text-green-500 font-medium">Walk-in</div> : null}
      </div>

      <div className="flex gap-2 mt-3">
        <button 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          onClick={() => onEdit(reservation)}
        >
          Edit
        </button>
        <button 
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          onClick={() => onDelete(reservation)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
