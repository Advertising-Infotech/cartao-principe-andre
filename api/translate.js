export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Missing text or targetLanguage' });
  }

  const languageNames = {
    en: 'English',
    he: 'Hebrew',
    ru: 'Russian',
    ar: 'Arabic',
    zh: 'Chinese',
    es: 'Spanish',
  };

  const targetLangName = languageNames[targetLanguage] || targetLanguage;

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2.5',
        messages: [
          {
            role: 'user',
            content: `Translate the following text from Portuguese to ${targetLangName}. Keep the same tone and style. If the text has line breaks (\\n), keep them. Only return the translated text, nothing else.\n\nText: ${text}`,
          },
        ],
        max_tokens: 500,
        stream: false,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]?.message) {
      const msg = data.choices[0].message;
      const content = msg.content || msg.reasoning_content || '';
      return res.status(200).json({ translatedText: content.trim() });
    }

    return res.status(500).json({ error: 'Unexpected API response', raw: data });
  } catch (error) {
    console.error('Translation API error:', error);
    return res.status(500).json({ error: 'Translation failed' });
  }
}
