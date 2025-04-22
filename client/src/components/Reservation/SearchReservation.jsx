import React, { useEffect, useState } from 'react';
import { searchReservation, createReservation } from '../../api';

function SearchReservationModal({ form, onClose, onCreated }) {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [excludedTables, setExcludedTables] = useState([]);

  const fetchSuggestion = async (tablesToExclude) => {
    setLoading(true);
    try {
      const res = await searchReservation({ 
        ...form, 
        excludedTables: tablesToExclude 
      });
      setSuggestion(res.data);
    } catch (err) {
      console.error('No available table', err);
      alert('No available table for this party size.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestion([]);
  }, []);

  useEffect(() => {
    if (excludedTables.length > 0) {
      fetchSuggestion(excludedTables);
    }
  }, [excludedTables]);

  const handleNextOption = () => {
    if (suggestion?.suggestedTableId) {
      const updated = [...excludedTables, suggestion.suggestedTableId];
      setExcludedTables(updated);
    }
  };

  const handleSeatHere = async () => {
    try {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const currentTime = `${hours}:${minutes} ${ampm}`;
  
      function convertTo24Hour(timeStr) {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
  
        if (modifier === 'PM' && hours !== 12) {
          hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
          hours = 0;
        }
  
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
  
      const timeToSend = form.isWalkIn
        ? currentTime
        : convertTo24Hour(form.time);
  
      const payload = {
        customer_name: form.isWalkIn ? 'Walk-in' : form.customer_name,
        phone_number: form.isWalkIn ? '0000000000' : form.phone_number,
        time: timeToSend,
        party: parseInt(form.party),
        isWalkIn: form.isWalkIn,
        table_id: suggestion.suggestedTableId,
        server_id: suggestion.suggestedServerId,
      };
    
      await createReservation(payload);
  
      if (onCreated) {
        await onCreated();
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error seating reservation.');
    }
  };  

  if (loading || !suggestion) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md text-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded shadow-md flex flex-col items-center gap-4 w-[300px]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold">Suggestion</h2>
        <p><strong>Table:</strong> {suggestion.section}{suggestion.tableNumber}</p>
        <p><strong>Server:</strong> {suggestion.serverName}</p>
        {suggestion.warning && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded text-sm w-full">
            ⚠️ {suggestion.warning}
          </div>
        )}

        <div className="flex gap-4 mt-4">
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSeatHere}
          >
            Seat Here
          </button>
          <button 
            disabled={loading}
            className={`bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextOption}
          >
            Next Option
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchReservationModal;
