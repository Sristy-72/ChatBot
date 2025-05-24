import axios from 'axios';

const callOpenAI = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: text }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('OpenAI response:', response.data.choices[0].message.content);
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    return '⚠️ Error fetching response.';
  }
};
