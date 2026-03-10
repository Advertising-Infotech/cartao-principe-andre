const API_URL = '/api/translate';

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (!text || !targetLanguage || targetLanguage === 'pt') return text;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage }),
    });

    if (!response.ok) {
      console.error('Translation API error:', response.status);
      return text;
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text
  }
}

interface CarouselItem {
  file: string;
  socialProof: string;
  line1: string;
  line2: string;
  line3: string;
  type: 'video' | 'image';
}

export async function translateCarouselItem(item: CarouselItem, targetLanguage: string): Promise<CarouselItem> {
  if (targetLanguage === 'pt') return item;

  const translatedItem = { ...item };

  const fieldsToTranslate = ['socialProof', 'line1', 'line2', 'line3'] as const;

  const translationPromises = fieldsToTranslate.map(async (field) => {
    if (item[field]) {
      translatedItem[field] = await translateText(item[field], targetLanguage);
    }
  });

  await Promise.all(translationPromises);
  return translatedItem;
}
