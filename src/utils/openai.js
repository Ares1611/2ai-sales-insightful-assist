import axios from 'axios';

export const generateAnalysis = async (text) => {
  try {
    const response = await axios.post('/api/analyze', { text });
    return response.data.analysis;
  } catch (error) {
    console.error(`Error generating analysis: ${error.response?.data?.error || error.message}`);
    throw error;
  }
};