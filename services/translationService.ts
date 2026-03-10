import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  if (!text || !targetLanguage || targetLanguage === 'pt') return text;

  const languageNames: { [key: string]: string } = {
    en: 'English',
    he: 'Hebrew',
    ru: 'Russian',
    ar: 'Arabic',
    zh: 'Chinese',
    es: 'Spanish'
  };

  const targetLangName = languageNames[targetLanguage] || targetLanguage;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following text from Portuguese to ${targetLangName}. Keep the same tone and style. If the text has line breaks (\n), keep them. Only return the translated text, nothing else.\n\nText: ${text}`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
}

export async function translateCarouselItem(item: any, targetLanguage: string): Promise<any> {
  if (targetLanguage === 'pt') return item;

  const fieldsToTranslate = ['socialProof', 'line1', 'line2', 'line3'];
  const translatedItem = { ...item };

  const translationPromises = fieldsToTranslate.map(async (field) => {
    if (item[field]) {
      translatedItem[field] = await translateText(item[field], targetLanguage);
    }
  });

  await Promise.all(translationPromises);
  return translatedItem;
}
