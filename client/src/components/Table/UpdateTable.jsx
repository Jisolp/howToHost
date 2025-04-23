import React, { useEffect, useState } from 'react';
import { updateTable, getServers } from '../../api'; 

function UpdateTable({ table, onClose, onUpdated }) {
  const [form, setForm] = useState({
    size: table.size,
    flexibility: table.flexibility,
    status: table.status,
    server_id: table.server_id || ''
  });

  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await getServers();
        setServers(res.data);
      } catch (err) {
        console.error('Error fetching servers:', err);
      }
    };
    fetchServers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTable(table.id, {
        ...form,
        server_id: form.server_id ? parseInt(form.server_id) : null
      });      
      onUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating table:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Table</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            name="size"
            value={form.size}
            onChange={handleChange}
            placeholder="Size"
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="flexibility"
            value={form.flexibility}
            onChange={handleChange}
            placeholder="Flexibility"
            className="border p-2 rounded"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="open">Open</option>
            <option value="reserved">Reserved</option>
            <option value="occupied">Occupied</option>
          </select>

          <select
            name="server_id"
            value={form.server_id}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Assign Server</option>
            {servers.map((server) => (
              <option key={server.id} value={server.id}>
                {server.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
              type="button"
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

export default UpdateTable;

