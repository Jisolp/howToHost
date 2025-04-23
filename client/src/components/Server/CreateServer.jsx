import React, { useState } from 'react';
import { createServer } from '../../api';

function CreateServer({ onClose, onCreated }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createServer({ name });
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error creating server.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Add Server</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Server Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateServer;
