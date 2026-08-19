const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data.json');

// POST /api/save-data
router.post('/save-data', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Noto\'g\'ri ma\'lumot formati' });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true, message: 'Ma\'lumotlar muvaffaqiyatli saqlandi' });
  } catch (err) {
    console.error('save-data xatosi:', err);
    res.status(500).json({ error: 'Ma\'lumotlarni saqlashda xatolik yuz berdi' });
  }
});

module.exports = router;