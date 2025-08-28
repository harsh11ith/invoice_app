const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
const invoiceRoutes = require('./routes/invoiceRoutes');
const path = require('path');
app.use('/invoices', express.static(path.join(__dirname, '../../invoices')));

app.use(cors());
const PORT = process.env.PORT || 5001;


app.use('/api/invoices', invoiceRoutes);

app.get('/', (req, res) => {
  res.send('Airline Invoice Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
