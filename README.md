# howToHost

## Project Description
This project is designed to optimize the seating process for both reservations and walk-ins. It allows the host to efficiently allocate tables based on the number of guests and the timing of reservations. The system takes into account factors such as the availability of servers, table sizes, and reservation times, aiming to minimize table turnover conflicts and maximize space utilization.

When I was a hostess at KBBQ, my manager wanted to optimize the tables being sat, while my servers begged me not to overload their sections. It was a constant struggle to keep both sides happy.
So, I built HowToHost—a seating tool that optimizes table usage based on the reservations, the server sections and it also sends reservation reminders via text so I don't have to! Basically, it helps hosts make better decisions without the stress.

### Key Features:
- **Reservation Management:** The ability to create, read, update, and delete reservations, along with automatic table allocation.
- **Table Assignment Algorithm:** A core feature that assigns tables based on party size, reservation timing, and available servers, ensuring optimal seating and avoiding back-to-back seating conflicts.
- **Server and Table Information:** Integration of server data and table status to track availability, optimize the assignment of tables, and ensure smooth transitions between customers.
- **Backend Infrastructure:** A RESTful API built with Express.js and SQLite to handle all CRUD operations for reservations, tables, and servers, providing scalability and ease of use for future enhancements.
- **Real-time Suggestions:** For walk-in customers, the system dynamically suggests available tables that fit the group size and do not conflict with upcoming reservations.

### Technologies Used:
- **Node.js** with **Express.js** for the backend API
- **SQLite** as the database for storing reservation and table data
- **JavaScript** for backend logic
- **Algorithms** for table allocation and optimization (Greedy Algorithm, with future consideration for Simulated Annealing)

### How It Works:
1. **Table Allocation:** The system dynamically assigns a table to a reservation based on the number of guests, available tables, and the schedule.
2. **Reservation Creation:** Hosts can input a reservation with customer details, the number of guests, and the time. The system automatically allocates an appropriate table.
3. **Walk-ins:** The system can suggest available tables for walk-in customers that meet their needs and don’t interfere with existing reservations.
