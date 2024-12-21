import React, { useState, useEffect } from 'react';
import { donationService } from './services/donationService';
import {
  Container, TextField, Button, Box, Typography, Select, MenuItem,
  InputLabel, FormControl, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid, Snackbar, Alert
} from '@mui/material';

const App = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [donationType, setDonationType] = useState('');
  const [message, setMessage] = useState('');
  const [donations, setDonations] = useState([]);  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const donationData = { name, amount, email, phone, donationType, message };

    try {
      const response = await donationService.addDonation(donationData); 
      setSnackbarMessage(response.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Update donations on the screen
      setDonations([...donations, { ...donationData }]); 

      // Clear form
      setName('');
      setAmount('');
      setEmail('');
      setPhone('');
      setDonationType('');
      setMessage('');
    } catch (error) {
      setSnackbarMessage('Error submitting donation!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const fetchData = async () => {
    try {
      const data = await donationService.getDonations(); // ดึงข้อมูลจาก API
      if (Array.isArray(data)) {
        setDonations(data); // ถ้าข้อมูลเป็นอาเรย์ก็อัปเดต state donations
      } else {
        console.error('ข้อมูลที่ได้รับไม่เป็นอาเรย์:', data); // หากไม่ใช่อาเรย์
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลบริจาค:', error.message); // จัดการข้อผิดพลาด
    }
  };

  useEffect(() => {
    fetchData(); // Fetch donations when the page loads
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {/* Donation Form */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
              Donation Tracker
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField label="Your Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required sx={{ mb: 2 }} variant="outlined" />
              <TextField label="Amount" type="number" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} required sx={{ mb: 2 }} variant="outlined" />
              <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} variant="outlined" />
              <TextField label="Phone Number" type="tel" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} variant="outlined" />
              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel>Donation Type</InputLabel>
                <Select value={donationType} onChange={(e) => setDonationType(e.target.value)} required>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Credit Card">Credit Card</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Message (Optional)" fullWidth multiline rows={4} value={message} onChange={(e) => setMessage(e.target.value)} sx={{ mb: 2 }} variant="outlined" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Donate</Button>
            </form>
          </Box>
        </Grid>

        {/* Donations Table */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <TableContainer component={Paper} sx={{ flexGrow: 1, borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#3f51b5', color: 'white' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Donation Type</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations.length > 0 ? (
                    donations.map((donation, index) => (
                      <TableRow key={index}>
                        <TableCell>{donation.name}</TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell>{donation.email}</TableCell>
                        <TableCell>{donation.phone}</TableCell>
                        <TableCell>{donation.donationType}</TableCell>
                        <TableCell>{donation.message}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No donations yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for displaying messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
