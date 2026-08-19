const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Rasmlar base64 bo'lishi mumkin

// API marshrutlari
app.use('/api', require('./api/get-data'));
app.use('/api', require('./api/save-data'));

// Statik fayllar (index.html va boshqalar)
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda: http://localhost:${PORT}`);
});