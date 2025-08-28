const passengers = require('./passengers');


const invoiceStatus = passengers.map(p => ({
  ticketNumber: p.ticketNumber,
  firstName: p.firstName,
  lastName: p.lastName,
  downloadStatus: 'Pending', 
  parseStatus: 'Pending',    
  pdfPath: null,
  parsedData: null,
  error: null
}));

module.exports = invoiceStatus;