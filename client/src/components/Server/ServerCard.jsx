import React from 'react';

function ServerCard({ server, tableCount, onDelete }) {
  return (
    <div className="border rounded-lg p-4 shadow flex justify-between items-center bg-white mb-3">
      <div>
        <h3 className="font-bold text-lg">{server.name}</h3>
        <p className="text-sm text-gray-600">Tables assigned: {tableCount}</p>
      </div>
      <button 
        onClick={() => onDelete(server.id)} 
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default ServerCard;
