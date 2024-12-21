const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./servicesAccountkey.json'); 

// เริ่มต้น Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(); // สร้าง Firestore instance

module.exports = { db };
