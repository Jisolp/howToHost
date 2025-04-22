const db = require('./config/db');

// Seed Sections
const sections = ['A', 'B', 'C','P'];

sections.forEach((section) => {
    db.run('INSERT INTO sections (name) VALUES (?)', [section], function(err) {
        if (err) console.error(`Error seeding section ${section}:`, err.message);
        else console.log(`Seeded Section: ${section}`);
    });
});

// Seed Servers
const servers = ['Jane', 'Bob', 'Charlie', 'Diana'];

servers.forEach((server) => {
    db.run('INSERT INTO servers (name) VALUES (?)', [server], function(err) {
        if (err) console.error(`Error seeding server ${server}:`, err.message);
        else console.log(`Seeded Server: ${server}`);
    });
});

// Seed Tables
const tables = [
    { section: 'A', table_number: 1, size: 4, flexibility: 1, status: 'open' },
    { section: 'A', table_number: 2, size: 4, flexibility: 1, status: 'open' },
    { section: 'A', table_number: 2, size: 6, flexibility: 1, status: 'open' },
    { section: 'B', table_number: 2, size: 2, flexibility: 0, status: 'open' },
    { section: 'B', table_number: 2, size: 2, flexibility: 0, status: 'open' },
    { section: 'B', table_number: 2, size: 2, flexibility: 0, status: 'open' },
    { section: 'C', table_number: 3, size: 6, flexibility: 1, status: 'open' },
    { section: 'D', table_number: 3, size: 6, flexibility: 1, status: 'open' },
];

tables.forEach((table) => {
    db.run(
        'INSERT INTO tables (section, table_number, size, flexibility, status) VALUES (?, ?, ?, ?, ?)',
        [table.section, table.table_number, table.size, table.flexibility, table.status],
        function(err) {
            if (err) console.error(`Error seeding table ${table.table_number}:`, err.message);
            else console.log(`Seeded Table: ${table.table_number}`);
        }
    );
});

// Close DB connection after a short timeout
setTimeout(() => {
    db.close();
    console.log('Database seeding complete. DB connection closed.');
}, 1000);

