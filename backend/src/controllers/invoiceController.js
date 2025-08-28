const invoiceStatus = require('../models/invoiceStatus');
// const { downloadInvoicePDF } = require('../services/pdfDownloader');

exports.getAllInvoices = (req, res) => {
  res.json(invoiceStatus);
};

exports.downloadInvoice = (req, res) => {
  const { ticketNumber } = req.params;
  const record = invoiceStatus.find(i => i.ticketNumber === ticketNumber);

  if (!record) {
    return res.status(404).json({ error: 'Passenger not found' });
  }

    // const pdfPath = await downloadInvoicePDF(ticketNumber, firstName, lastName);

  record.downloadStatus = 'Success';
  record.pdfPath = `/invoices/${ticketNumber}.pdf`;

  res.json({ message: 'Invoice downloaded', record });
};

exports.parseInvoice = (req, res) => {
  const { ticketNumber } = req.params;
  const record = invoiceStatus.find(i => i.ticketNumber === ticketNumber);

  if (!record) {
    return res.status(404).json({ error: 'Passenger not found' });
  }
  if (record.downloadStatus !== 'Success') {
    return res.status(400).json({ error: 'Invoice not downloaded yet' });
  }


  record.parseStatus = 'Success';
  record.parsedData = {
    invoiceNumber: `INV-${ticketNumber}`,
    date: new Date().toISOString().slice(0, 10),
    airline: 'Thai Airways',
    amount: 12345, 
    gstin: 'GSTIN123456' 
  };

  res.json({ message: 'Invoice parsed', record });
};

exports.getParsedInvoices = (req, res) => {
  const parsed = invoiceStatus.filter(i => i.parseStatus === 'Success');
  res.json(parsed);
};

exports.getSummary = (req, res) => {
  const summary = {};
  invoiceStatus.forEach(i => {
    if (i.parseStatus === 'Success') {
      const airline = i.parsedData.airline;
      if (!summary[airline]) summary[airline] = { totalAmount: 0, count: 0 };
      summary[airline].totalAmount += i.parsedData.amount;
      summary[airline].count += 1;
    }
  });
  res.json(summary);
};

exports.getHighValueInvoices = (req, res) => {
  const threshold = parseFloat(req.query.threshold) || 10000; // Default: 10000
  const highValue = invoiceStatus.filter(
    i => i.parseStatus === 'Success' && i.parsedData.amount > threshold
  );
  res.json(highValue);
};
