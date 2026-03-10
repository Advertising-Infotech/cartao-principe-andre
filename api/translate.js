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
  
  // Log available keys (not values) to debug Vercel env
  console.log("Diag: Available Env Keys:", Object.keys(process.env).filter(k => k.toLowerCase().includes('kimi') || k.toLowerCase().includes('nvidia')));

  const apiKey = process.env.Kimi_K2_5 || process.env.KIMI_K2_5 || process.env.Kimi_K25 || process.env.NVIDIA_API_KEY;
  
  if (!apiKey) {
    console.error("Diag: No API Key found in environment variables!");
    return res.status(500).json({ error: 'API Key not configured on server' });
  }

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
    console.log(`Diag: Translating to ${targetLangName}: "${text.substring(0, 30)}..."`);
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    if (!response.ok) {
      console.error('Diag: NVIDIA API Error:', response.status, JSON.stringify(data));
      return res.status(response.status).json({ error: 'NVIDIA API Error', details: data });
    }

    if (data.choices && data.choices[0]?.message) {
      const msg = data.choices[0].message;
      const content = (msg.content || msg.reasoning_content || '').trim();
      console.log(`Diag: Translation success: "${content.substring(0, 30)}..."`);
      return res.status(200).json({ translatedText: content });
    }

    return res.status(500).json({ error: 'Unexpected API response structure', raw: data });
  } catch (error) {
    console.error('Diag: Translation API full error:', error);
    return res.status(500).json({ error: 'Translation failed', message: error.message });
  }
}
