const express = require('express');
const bodyParser = require('body-parser');
const feedbackRouter = require('./feedback');
const { scrapeCompanyWebsite } = require('./scraper');
const { generateAnalysis } = require('./openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', feedbackRouter);

// Scraping endpoint
app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const data = await scrapeCompanyWebsite(url);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const analysis = await generateAnalysis(text);
    res.json({ analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});