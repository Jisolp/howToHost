import React, { useEffect, useState } from 'react';
import { getTables, deleteTable } from '../../api';
import CreateTable from './CreateTable';
import UpdateTable from './UpdateTable';
import TableGridLayout from './TableGridLayout';
import TableInfoModal from './TableInfoModal';
import CreateReservation from '../Reservation/CreateReservation';

function TableList({ tables, fetchTables }) {
//   const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInfoTable, setShowInfoTable] = useState(null);
  const [showCreateReservation, setShowCreateReservation] = useState(false);


//   const fetchTables = async () => {
//     try {
//       const res = await getTables();
//       setTables(res.data);
//     } catch (err) {
//       console.error('Error fetching tables', err);
//     }
//   };

  const handleEdit = (table) => {
    setSelectedTable(table);
    setShowEditModal(true);
  };

  const handleDelete = async (table) => {
    if (confirm(`Delete table ${table.section}${table.table_number}?`)) {
      try {
        await deleteTable(table.id);
        fetchTables();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

const handleTableClick = (table) => {
    setShowInfoTable(table); // open modal
  };
  
  return (
    <div className="z-0 max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold"></h1>
        <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowCreateModal(true)}
        >
        Create Table
        </button>
        {showCreateReservation && (
            <CreateReservation onCreated={fetchTables} />
        )}
        </div>

        <TableGridLayout 
        tables={tables} 
        onTableClick={handleTableClick}
        onUpdated = {fetchTables}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={async (id, newStatus) => {
            try {
            await updateTable(id, { status: newStatus });
            fetchTables();
            } catch (err) {
            console.error(err);
            }
        }}
        />
        {showInfoTable && (
        <TableInfoModal table={showInfoTable} onClose={() => setShowInfoTable(null)} />
        )}
        {showCreateModal && (
        <CreateTable onClose={() => setShowCreateModal(false)} onCreated={fetchTables} />
        )}

      {tables.map(table => (
        <div key={table.id} className="mt-4 flex justify-between items-center border p-2 rounded shadow">
          <div>{table.section}{table.table_number} - Size: {table.size}, Status: {table.status}
          </div>
          <div className="flex gap-2">
            <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(table)}>Edit</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(table)}>Delete</button>
          </div>
        </div>
      ))}
      {showEditModal && (
        <UpdateTable table={selectedTable} onClose={() => setShowEditModal(false)} onUpdated={fetchTables} />
      )}
    </div>
  );
}

export default TableList;
