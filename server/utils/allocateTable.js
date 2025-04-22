
function parseTimeToDate(timeStr) {
    // timeStr is like "7:00 PM" or "10:30 AM"
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier.toUpperCase() === 'PM' && hours !== 12) {
        hours += 12;
    }
    if (modifier.toUpperCase() === 'AM' && hours === 12) {
        hours = 0;
    }

    return new Date(1970, 0, 1, hours, minutes, 0); // (Year, MonthIndex, Day, Hours, Minutes, Seconds)
}

const allocateTable = (tables, reservations, servers, party, time, isWalkIn = false) => {
    // Sort tables: smaller ones first (to not waste bigger tables)
    tables.sort((a, b) => a.size - b.size);

    let requestedStart;
    let requestedEnd;

    if (!isWalkIn) {
        requestedStart = new Date(`1970-01-01T${time}`);
        requestedEnd = new Date(requestedStart);
        requestedEnd.setHours(requestedEnd.getHours() + 2); // 2-hour reservation
    }

    for (let table of tables) {
        if (table.size < party) continue; // Table too small
        if (table.status !== 'open') continue; // Table already not open

        let tableAvailable = true;

        if (!isWalkIn) {
            // For normal reservation, check time conflicts
            for (let reservation of reservations) {
                if (reservation.table_id === table.id) {
                    const existingStart = parseTimeToDate(reservation.time);
                    const existingEnd = new Date(existingStart);
                    existingEnd.setHours(existingEnd.getHours() + 2);

                    const overlap = requestedStart < existingEnd && requestedEnd > existingStart;
                    if (overlap) {
                        tableAvailable = false;
                        break;
                    }
                }
            }
        }

        if (tableAvailable) {
            // Find least busy server
            let leastBusyServer = servers[0];
            for (let server of servers) {
                const currentReservations = reservations.filter(res => res.server_id === server.id).length;
                if (currentReservations < reservations.filter(res => res.server_id === leastBusyServer.id).length) {
                    leastBusyServer = server;
                }
            }

            return {
                table_id: table.id,
                server_id: leastBusyServer.id
            };
        }
    }

    return { message: "No table available." };
};

module.exports = allocateTable;