//test if tabels sorted correctly 
//walk in 
//reservation 
//invalid cases - no open table for walk in  

const allocateTable = require("../utils/allocateTable")

describe('allocateTable function',() => {
    let tables, reservations, servers;

    beforeEach(() =>{
        tables = [
            {id:1, section: 'A', table_number: 1, size: 4, flexibility: 0, status: 'open', server_id: 1},
            {id:2, section: 'A', table_number: 2, size: 5, flexibility: 1, status: 'open', server_id: 2},
            {id:3, section: 'B', table_number: 1, size: 3, flexibility: 1, status: 'open', server_id: 2},
            {id:4, section: 'B', table_number: 2, size: 2, flexibility: 0, status: 'open', server_id: 2},
        ];
        servers = [
            {id: 1, name: 'server one'},
            {id: 2, name: 'server two'},
            {id: 3, name: 'server three'},
        ];
        reservations = [
            { id: 1, customer_name: 'customer one', time: '12:00 PM', party: '4', status: 'confirm' ,table_id: 1},
            { id: 2, customer_name: 'customer two', time: '12:00 PM', party: '6', status: 'confirm', table_id: 2},
        ];
    });

    it('sort tables by size',() =>{
        const sortedTables = [...tables];
        sortedTables.sort((a,b) => {
            if (a.size !== b.size)
                return b.size - a.size
        });
        expect(sortedTables[0].id).toBe(2);
        expect(sortedTables[1].id).toBe(1);
        expect(sortedTables[2].id).toBe(3);
        expect(sortedTables[3].id).toBe(4);
    });

    it('assign table and server for reservation', () => {
        const party = 4;
        const time = '12:00 PM';
        const isWalkIn = false;

        const res = allocateTable(tables,reservations,servers,party,time,isWalkIn);

        expect(res).toHaveProperty('table_id');
        expect(res).toHaveProperty('server_id');
        expect(res.table_id).toBe(3);
    });

    it('assign table and server for walk in customers', () => {
        const party = 2;
        const time = '12:00 PM';
        const isWalkIn = true;

        const res = allocateTable(tables, reservations, servers, party, time, isWalkIn);

        expect(res).toHaveProperty('table_id');
        expect(res).toHaveProperty('server_id');
        expect(res.table_id).toBe(4);
    });

    it('error message: no tables open for walk in', () =>{
        const party = 9; 
        const time = '4:00 PM';
        const isWalkIn = true;

        const res = allocateTable(tables,reservations,servers,party,time,isWalkIn);
        
        expect(res).toHaveProperty('message');
        expect(res.message).toBe('No table available for walk-in.');
    });
});