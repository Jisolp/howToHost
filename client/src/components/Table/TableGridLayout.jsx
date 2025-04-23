import React from 'react';
import { updateTable } from '../../api';

function TableGridLayout({ tables, onTableClick, onUpdated }) {
  const getBorderColor = (status) => {
    switch (status) {
      case 'open':
        return 'border-green-500';
      case 'reserved':
        return 'border-yellow-500';
      case 'occupied':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  const handleStatusChange = async (tableId, newStatus) => {
    try {
      await updateTable(tableId, { status: newStatus });
      if (onUpdated) onUpdated(); 
    } catch (err) {
      console.error('Error updating table status:', err);
    }
  };

  return (
    <div className="z-0 grid grid-cols-4 gap-4 p-4">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`relative border-2 ${getBorderColor(table.status)} rounded p-4 shadow-md text-center bg-white hover:shadow-lg transition`}
        >
          <h3 className="font-bold text-lg">{table.section}{table.table_number}</h3>
          <p>Size: {table.size}</p>
          <p>Flex: {table.flexibility}</p>

          <select
            value={table.status}
            onChange={(e) => handleStatusChange(table.id, e.target.value)}
            className="mt-2 border p-1 rounded text-sm"
          >
            <option value="open">Open</option>
            <option value="reserved">Reserved</option>
            <option value="occupied">Occupied</option>
          </select>

          <button
            onClick={() => onTableClick && onTableClick(table)}
            className="z-2000 text-xs text-blue-500 mt-2 underline"
          >
            View Info
          </button>
        </div>
      ))}
    </div>
  );
}

export default TableGridLayout;

