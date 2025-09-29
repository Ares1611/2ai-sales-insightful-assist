const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAnalysis = async (text) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following text and provide a detailed report:\n\n${text}`,
      max_tokens: 500,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(`Error generating analysis: ${error}`);
    throw error;
  }
};

module.exports = { generateAnalysis };