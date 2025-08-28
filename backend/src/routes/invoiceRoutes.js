const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const passengers = require('../models/passengers');

router.get('/', invoiceController.getAllInvoices);

router.get('/passengers', (req, res) => {
  res.json(passengers);
});

router.post('/download/:ticketNumber', invoiceController.downloadInvoice);
router.post('/parse/:ticketNumber', invoiceController.parseInvoice);
router.get('/parsed', invoiceController.getParsedInvoices);
router.get('/summary', invoiceController.getSummary);
router.get('/high-value', invoiceController.getHighValueInvoices);


module.exports = router;