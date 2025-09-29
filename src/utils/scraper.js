import axios from 'axios';

export const scrapeCompanyWebsite = async (url) => {
  try {
    const response = await axios.post('/api/scrape', { url });
    return response.data;
  } catch (error) {
    console.error(`Error scraping website: ${error.response?.data?.error || error.message}`);
    throw error;
  }
};