const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function downloadInvoicePDF(ticketNumber, firstName, lastName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  await page.goto('https://thaiair.thaiairways.com/ETAXPrint/pages/passengerPages/passengerHomePage.jsp');

  
  await page.type('#ticketNumber', ticketNumber);
  await page.type('#firstName', firstName);
  await page.type('#lastName', lastName);


  await Promise.all([
    page.click('#submitButton'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  
  const pdfLinkSelector = '#pdfDownloadLink'; 
  await page.waitForSelector(pdfLinkSelector);


  const pdfUrl = await page.$eval(pdfLinkSelector, el => el.href);

  const view = await page.goto(pdfUrl);
  const buffer = await view.buffer();


  const pdfPath = path.join(__dirname, '../../../invoices', `${ticketNumber}.pdf`);
  fs.writeFileSync(pdfPath, buffer);

  await browser.close();
  return pdfPath;
}

module.exports = { downloadInvoicePDF };