require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

const resRoutes = require('./routes/resRoutes');
const sectionsRoutes = require('./routes/sectionsRoutes');
const serverRoutes = require('./routes/serverRoutes');
const tableRoutes = require('./routes/tableRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', resRoutes);
app.use('/api', sectionsRoutes);
app.use('/api', serverRoutes);
app.use('/api', tableRoutes);
app.use('/api', searchRoutes);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
});

// Test route
// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// Error handling middleware (MUST be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
