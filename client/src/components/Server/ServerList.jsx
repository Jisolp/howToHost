import React, { useEffect, useState } from 'react';
import { getServers, deleteServer, getServerTableCount } from '../../api';
import CreateServer from './CreateServer';
import ServerCard from './ServerCard';

function ServerList() {
  const [servers, setServers] = useState([]);
  const [tableCounts, setTableCounts] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchServers = async () => {
    try {
      const res = await getServers();
      setServers(res.data);
      const counts = {};
      for (let s of res.data) {
        const { data } = await getServerTableCount(s.id);
        counts[s.id] = data.count;
      }
      setTableCounts(counts);
    } catch (err) {
      console.error('Error fetching servers', err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this server?')) {
      try {
        await deleteServer(id);
        fetchServers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateModal(true)}
        >
          Add Server
        </button>
      </div>

      {servers.map((s) => (
        <ServerCard 
          key={s.id} 
          server={s} 
          tableCount={tableCounts[s.id] || 0}
          onDelete={handleDelete}
        />
      ))}

      {showCreateModal && (
        <CreateServer 
          onClose={() => setShowCreateModal(false)} 
          onCreated={fetchServers} 
        />
      )}
    </div>
  );
}

export default ServerList;
