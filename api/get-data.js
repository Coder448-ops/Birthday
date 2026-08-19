const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data.json');

// Standart ma'lumotlar (index.html dagi default bilan bir xil bo'lishi kerak)
function getDefaultData() {
  return {
    profile: {
      firstName: 'Tumajon',
      lastName: 'Ollomova',
      age: '54',
      heroTitle: '',
      heroDescription: "Mehr, oila va go'zal xotiralar bilan bezalgan hayot.",
      about: "Har bir inson o'z hayotida go'zal lahzalar, mehr va yaqinlar bilan bog'liq xotiralar to'playdi. Ushbu sahifa — shu iliq xotiralar, oilaviy qadriyatlar va hayotning eng qimmatli daqiqalarini asrab qolish uchun yaratilgan shaxsiy burchak.\n\nHar bir kun — yangi imkoniyat, har bir uchrashuv — yangi xotira.",
      portrait: '',
      aboutPhoto: ''
    },
    values: [
      { icon: '❤️', name: 'Oila' },
      { icon: '🌸', name: 'Mehr' },
      { icon: '🤍', name: 'Yaqinlar' },
      { icon: '✨', name: 'Baxt' },
      { icon: '🌿', name: 'Xotiralar' }
    ],
    gallery: [],
    family: [],
    timeline: [],
    quote: 'Hayotning eng katta boyligi — yoningdagi aziz insonlar.'
  };
}

// GET /api/get-data
router.get('/get-data', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const data = JSON.parse(raw);
      res.json(data);
    } else {
      // Fayl mavjud bo'lmasa standartni qaytaramiz
      const defaults = getDefaultData();
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaults, null, 2));
      res.json(defaults);
    }
  } catch (err) {
    console.error('get-data xatosi:', err);
    res.status(500).json({ error: 'Ma\'lumotlarni o\'qishda xatolik yuz berdi' });
  }
});

module.exports = router;