import React, { useState } from 'react';
import { createReservation } from '../../api';
import SearchReservationModal from './SearchReservation';

function CreateReservation({ onCreated }) {
  const [form, setForm] = useState({
    customer_name: '',
    phone_number: '',
    time: '',
    party: '',
    isWalkIn: false
  });
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSearchTable = (e) => {
    e.preventDefault();
    if (!form.party) {
      alert('Please enter a party size first.');
      return;
    }
    setShowSearchModal(true);
  };
  const resetForm = () => {
    setForm({
      customer_name: '',
      phone_number: '',
      time: '',
      party: '',
      isWalkIn: false,
    });
  };
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">

      <form className="flex flex-col gap-3">
        {!form.isWalkIn && (
          <>
            <input
              className="border p-2 rounded"
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
            <input
              className="border p-2 rounded"
              type="text"
              name="time"
              placeholder="Time (e.g. 7:00 PM)"
              value={form.time}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          className="border p-2 rounded"
          type="number"
          name="party"
          placeholder="Party Size"
          value={form.party}
          onChange={handleChange}
          required
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="isWalkIn"
            checked={form.isWalkIn}
            onChange={handleChange}
          />
          Walk-In?
        </label>

        <button
          onClick={handleSearchTable}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search Table
        </button>
      </form>

      {showSearchModal && (
        <SearchReservationModal 
            form={form}
            onClose={() => {
              setShowSearchModal(false);
              resetForm();
            }}
            onCreated={onCreated}
         />
      )}
    </div>
  );
}

export default CreateReservation;