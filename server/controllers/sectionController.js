const sectionsService = require('../services/sectionService');

const createSection = async (req, res) => {
    try {
        const id = await sectionsService.createSection(req.body.name);
        res.status(201).json({ id, name: req.body.name });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
};

const getSections = async (req, res) => {
    try {
        const sections = await sectionsService.getSections();
        res.status(200).json(sections);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

const getSectionByID = async (req, res) => {
    try {
        const section = await sectionsService.getSectionByID(req.params.id);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }
        res.status(200).json(section);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

const deleteSection = async (req, res) => {
    try {
        const changes = await sectionsService.deleteSection(req.params.id);
        if (changes === 0) {
            return res.status(404).json({ message: "Section not found" });
        }
        res.status(200).json({ message: "Section deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "server error" });
    }
};

module.exports = {
    createSection,
    getSections,
    getSectionByID,
    deleteSection
};
