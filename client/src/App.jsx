// import React from "react";
// import ReservationList from "./components/Reservation/ReservationList";
// import TableList from "./components/Table/TableList";
// import ServerList from "./components/Server/ServerList";

// function App() {
//   return (
//     <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
//       <div className="flex w-full max-w-[1600px] border bg-white rounded-lg shadow-lg overflow-hidden">

//         {/* Left Panel - Reservations (40%) */}
//         <div className="w-[30%] border-r overflow-auto max-h-[85vh] p-4">
//           <h1 className="text-2xl font-bold mb-4">Reservations</h1>
//           <ReservationList fetchTables={fetchTables} />
//         </div>

//         {/* Middle Panel - Tables (40%) */}
//         <div className="w-[50%] border-r overflow-auto max-h-[85vh] p-4">
//           <h2 className="text-xl font-bold mb-4">Tables</h2>
//           <TableList fetchTables={fetchTables}/>
//         </div>

//         {/* Right Panel - Servers (20%) */}
//         <div className="w-[20%] overflow-auto max-h-[85vh] p-4">
//           <h2 className="text-xl font-bold mb-4">Servers</h2>
//           <ServerList />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import ReservationList from "./components/Reservation/ReservationList";
import TableList from "./components/Table/TableList";
import ServerList from "./components/Server/ServerList";
import { getTables, getReservations } from "./api";

function App() {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchTables = async () => {
    try {
      const res = await getTables();
      setTables(res.data);
    } catch (err) {
      console.error("Error fetching tables", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await getReservations();
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations", err);
    }
  };

  useEffect(() => {
    fetchTables();
    fetchReservations();
  }, []);
  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="flex w-full max-w-7xl border bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Panel - Reservations */}
        <div className="w-[30%] border-r overflow-auto max-h-[85vh] p-4">
          <h1 className="text-2xl font-bold mb-4">Customers</h1>
          <ReservationList 
            reservations={reservations} 
            fetchReservations={fetchReservations}
            fetchTables={fetchTables}
          />
        </div>

        {/* Right Panel - Tables */}
        <div className="w-[50%] border-r overflow-auto max-h-[85vh] p-4">
          <TableList 
            tables={tables} 
            fetchTables={fetchTables} 
          />
        </div>
        <div className="w-[20%] overflow-auto max-h-[85vh] p-4">
         <h2 className="text-xl font-bold mb-4">Servers</h2>
          <ServerList />
        </div>
      </div>
    </div>
  );
}
export default App;
