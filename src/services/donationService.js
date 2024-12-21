import axios from 'axios';


const API_URL = 'https://api-route-six.vercel.app'; 

export const donationService = {
  // ฟังก์ชันดึงข้อมูลบริจาคทั้งหมดจาก backend
  async getDonations() {
    try {
      const response = await axios.get(`${API_URL}/api/donations`); // ใช้ GET เพื่อดึงข้อมูลบริจาค
      return response.data; 
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลบริจาค');
    }
  },

  // ฟังก์ชันสำหรับการส่งข้อมูลบริจาคใหม่ไปที่ backend
  async addDonation(donationData) {
    try {
      const response = await axios.post(`${API_URL}/api/donations`, donationData); // ส่งข้อมูลโดยใช้ POST
      return response.data; 
    } catch (error) {
      throw new Error('เกิดข้อผิดพลาดในการส่งข้อมูลบริจาค');
    }
  },
};
