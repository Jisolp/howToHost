import React, { useState } from 'react';
import { createTable } from '../../api';

function CreateTable({ onCreated, onClose }) {
  const [form, setForm] = useState({
    section: '',
    table_number: '',
    size: '',
    flexibility: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTable(form);
      onCreated();
      setForm({ section: '', table_number: '', size: '', flexibility: '' });
      onClose(); 
    } catch (err) {
      console.error('Error creating table:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded shadow-lg w-96">
        <button 
          className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">Add Table</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="section" placeholder="Section (e.g. A)" value={form.section} onChange={handleChange} className="border p-2 rounded" required />
          <input name="table_number" placeholder="Table Number" value={form.table_number} onChange={handleChange} className="border p-2 rounded" required />
          <input name="size" type="number" placeholder="Size" value={form.size} onChange={handleChange} className="border p-2 rounded" required />
          <input name="flexibility" type="number" placeholder="Flexibility" value={form.flexibility} onChange={handleChange} className="border p-2 rounded" required />

          <div className="flex justify-between mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTable;

