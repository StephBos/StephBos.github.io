const express = require('express');
const cors = require('cors'); // Import CORS
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const app = express();
const port = 8080;

console.log('Starting the backend server...');

// Enable CORS for all origins (Modify if needed)
app.use(cors());

// Extract text from PDFs
app.get('/extract-pdf', async (req, res) => {
  try {
    console.log('getting reference files')
    console.log('dirname', __dirname)
    const folderPath = path.join(__dirname, 'reference-files');
    const files = fs.readdirSync(folderPath);

    let pdfTexts = {};

    // Process all PDFs asynchronously
    const pdfPromises = files
      .filter(filename => filename.endsWith('.pdf'))
      .map(async (filename) => {
        const pdfPath = path.join(folderPath, filename);
        const fileBuffer = fs.readFileSync(pdfPath);
        const data = await pdfParse(fileBuffer);
        pdfTexts[filename] = data.text;
      });

    // Wait for all PDFs to be processed
    await Promise.all(pdfPromises);
    res.json(pdfTexts);
  } catch (error) {
    console.error('Error processing PDFs:', error);
    res.status(500).json({ error: 'Failed to extract PDFs' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
