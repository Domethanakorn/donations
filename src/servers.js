const express = require('express');
const cors = require('cors');
const { db } = require('./firebase'); // Firestore instance

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API เพิ่มข้อมูลบริจาค
app.post('/api/donations', async (req, res) => {
  const { name, amount, email, phone, donationType, message } = req.body;

  if (!name || !amount || !email || !phone || !donationType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const donationRef = db.collection('donations').doc(); 
    await donationRef.set({
      name,
      amount,
      email,
      phone,
      donationType,
      message,
    });

    res.status(200).json({ message: 'Donation added successfully!' });
  } catch (error) {
    console.error('Error adding donation:', error);
    res.status(500).json({ message: 'Error adding donation' });
  }
});

// API ดึงข้อมูลการบริจาคทั้งหมด
app.get('/api/donations', async (req, res) => {
  try {
    const donationsSnapshot = await db.collection('donations').get(); 
    const donations = donationsSnapshot.docs.map(doc => ({
      id: doc.id,  // เพิ่ม id ของเอกสาร
      ...doc.data(),  // รวมข้อมูลของเอกสาร
    }));

    res.status(200).json(donations);  
  } catch (error) {
    console.error('Error retrieving donations:', error);
    res.status(500).json({ message: 'Error retrieving donations' });
  }
});
const port = process.env.PORT || 5000;  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ใช้ฟังก์ชัน app แทนการตั้งค่าพอร์ต
module.exports = (req, res) => {
  app(req, res);  
};
