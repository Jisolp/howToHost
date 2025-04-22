import React, { useState } from 'react';
import { updateReservation } from '../../api';

function UpdateReservation({ reservation, onClose, onUpdated }) {
  const [form, setForm] = useState({
    customer_name: reservation.customer_name,
    phone_number: reservation.phone_number,
    time: reservation.time,
    party: reservation.party,
    isWalkIn: reservation.isWalkIn,
    status: reservation.status 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReservation(reservation.id, form);
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Reservation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
            className="border p-2 rounded"
            type="text"
            name="customer_name"
            placeholder="Customer Name"
            value={form.customer_name}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="phone_number"
            placeholder="0000000000"
            value={form.phone_number}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            type="text"
            name="time"
            placeholder="Time (e.g. 7:00 PM)"
            value={form.time}
            onChange={handleChange}
          />
          <input
            className="border p-2 rounded"
            type="number"
            name="party"
            placeholder="Party Size"
            value={form.party}
            onChange={handleChange}
          />
          <select
            className="border p-2 rounded"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Change Status...</option>
            <option value="confirm">Confirm</option>
            <option value="no-show">No Show</option>
            <option value="canceled">Cancel</option>
          </select>

          <div className="flex justify-between mt-4">
            <button 
              className="bg-gray-300 text-black px-4 py-2 rounded"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateReservation;
