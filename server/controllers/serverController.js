const serverService = require('../services/serverService');

const createServer = async (req, res) => {
    try {
        const id = await serverService.createServer(req.body.name);
        res.status(201).json({ id, name: req.body.name });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
};

const getServers = async (req, res) => {
    try {
        const servers = await serverService.getServers();
        res.status(200).json(servers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

const getServerByID = async (req, res) => {
    try {
        const server = await serverService.getServerByID(req.params.id);
        if (!server) {
            return res.status(404).json({ message: "Server not found" });
        }
        res.status(200).json(server);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};
const getServerTableCount = async (req, res) => {
    const { id } = req.params;
    try {
      const count = await serverService.getServerTableCount(id);
      res.status(200).json({ count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting table count" });
    }
};

const deleteServer = async (req, res) => {
    try {
        const changes = await serverService.deleteServer(req.params.id);
        if (changes === 0) {
            return res.status(404).json({ message: "Server not found" });
        }
        res.status(200).json({ message: "Server deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    createServer,
    getServers,
    getServerByID,
    getServerTableCount,
    deleteServer
};
