const tableService = require('../services/tableService');

const createTable = async (req, res) => {
    try {
        const id = await tableService.createTable(req.body);
        res.status(201).json({ id });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
};

const getTable = async (req, res) => {
    try {
        const tables = await tableService.getTables();
        res.status(200).json(tables);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

const getTableByID = async (req, res) => {
    try {
        const table = await tableService.getTableByID(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json(table);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};


const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No update fields provided" });
        }

        const changes = await tableService.updateTable(id, updateFields);

        if (changes === 0) {
            return res.status(404).json({ message: "Table not found" });
        }

        res.status(200).json({ message: "Table updated successfully" });
    } catch (error) {
        console.error("Error updating table:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteTable = async (req, res) => {
    try {
        const changes = await tableService.deleteTable(req.params.id);
        if (changes === 0) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({ message: "Table deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    createTable,
    getTable,
    getTableByID,
    updateTable,
    deleteTable
};
