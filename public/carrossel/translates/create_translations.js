/**
 * Script único para gerar os 6 arquivos XLS traduzidos.
 * Lê Titulos.xls (português) e cria:
 *   Titulos_en.xls, Titulos_he.xls, Titulos_ru.xls,
 *   Titulos_ar.xls, Titulos_zh.xls, Titulos_es.xls
 *
 * Rode uma única vez:  node create_translations.js
 * Depois, edite cada XLS manualmente para refinar as traduções.
 */
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const DIR = path.join('public', 'carrossel');
const SRC = path.join(DIR, 'Titulos.xls');

// ---------- 1. Ler o XLS original ----------
const wb = XLSX.readFile(SRC);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

console.log(`Lido ${SRC}: ${rows.length} linhas\n`);

// Mostra as linhas originais pra conferência
rows.forEach((r, i) => console.log(`  [${i}] ${JSON.stringify(r)}`));
console.log('');

// ---------- 2. Dicionário de traduções ----------
// Cada chave-lang mapeia coluna B/C/D/E em PT → tradução.
// Coluna A (nome do arquivo) NUNCA muda.
// As traduções abaixo são genéricas e devem ser revisadas pelo usuário.

const translations = {
  en: {
    // Col B – Social Proof
    'Prova social mundial': 'World Social Proof',
    'Prova social': 'Social Proof',
    // Col C – Títulos/Honrarias (line1)
    'Homenageado por deputados': 'Honored by deputies',
    'Honraria Solene': 'Solemn Honor',
    'Título de Cidadão Honorário': 'Honorary Citizen Title',
    'Certificado de Reconhecimento': 'Certificate of Recognition',
    'Moção de Aplausos': 'Motion of Applause',
    'Homenagem Especial': 'Special Tribute',
    'Diploma de Honra ao Mérito': 'Diploma of Honor and Merit',
    'Título de Embaixador': 'Ambassador Title',
    'Comenda': 'Commendation',
    'Medalha de Honra': 'Medal of Honor',
    // Col D – Localizações (line2)
    'Assembleia Legislativa do Estado de Goiás': 'Legislative Assembly of the State of Goiás',
    'Câmara Municipal de Goiânia': 'City Council of Goiânia',
    'Câmara Municipal': 'City Council',
    'Senado Federal': 'Federal Senate',
    'Congresso Nacional': 'National Congress',
    // Col E – (line3)
    'Deputado Estadual': 'State Deputy',
    'Deputado Federal': 'Federal Deputy',
    'Vereador': 'Council Member',
    'Senador': 'Senator',
  },
  he: {
    'Prova social mundial': 'הוכחה חברתית עולמית',
    'Prova social': 'הוכחה חברתית',
    'Homenageado por deputados': 'זכה לכבוד מחברי הפרלמנט',
    'Honraria Solene': 'כבוד חגיגי',
    'Título de Cidadão Honorário': 'תואר אזרח כבוד',
    'Certificado de Reconhecimento': 'תעודת הכרה',
    'Moção de Aplausos': 'הצעת מחיאות כפיים',
    'Homenagem Especial': 'מחווה מיוחדת',
    'Diploma de Honra ao Mérito': 'דיפלומה של כבוד וזכות',
    'Título de Embaixador': 'תואר שגריר',
    'Comenda': 'עיטור',
    'Medalha de Honra': 'מדליית כבוד',
    'Assembleia Legislativa do Estado de Goiás': 'האספה המחוקקת של מדינת גויאס',
    'Câmara Municipal de Goiânia': 'מועצת העיר גויאניה',
    'Câmara Municipal': 'מועצת העיר',
    'Senado Federal': 'הסנאט הפדרלי',
    'Congresso Nacional': 'הקונגרס הלאומי',
    'Deputado Estadual': 'חבר פרלמנט מדינתי',
    'Deputado Federal': 'חבר פרלמנט פדרלי',
    'Vereador': 'חבר מועצת עיר',
    'Senador': 'סנאטור',
  },
  ru: {
    'Prova social mundial': 'Мировое социальное доказательство',
    'Prova social': 'Социальное доказательство',
    'Homenageado por deputados': 'Удостоен чести депутатами',
    'Honraria Solene': 'Торжественная награда',
    'Título de Cidadão Honorário': 'Звание почетного гражданина',
    'Certificado de Reconhecimento': 'Сертификат признания',
    'Moção de Aplausos': 'Аплодисменты',
    'Homenagem Especial': 'Особая дань уважения',
    'Diploma de Honra ao Mérito': 'Диплом почета и заслуг',
    'Título de Embaixador': 'Звание посла',
    'Comenda': 'Орден',
    'Medalha de Honra': 'Медаль почета',
    'Assembleia Legislativa do Estado de Goiás': 'Законодательное собрание штата Гояс',
    'Câmara Municipal de Goiânia': 'Городской совет Гоянии',
    'Câmara Municipal': 'Городской совет',
    'Senado Federal': 'Федеральный сенат',
    'Congresso Nacional': 'Национальный конгресс',
    'Deputado Estadual': 'Депутат штата',
    'Deputado Federal': 'Федеральный депутат',
    'Vereador': 'Член городского совета',
    'Senador': 'Сенатор',
  },
  ar: {
    'Prova social mundial': 'دليل اجتماعي عالمي',
    'Prova social': 'دليل اجتماعي',
    'Homenageado por deputados': 'كرمه النواب',
    'Honraria Solene': 'تكريم رسمي',
    'Título de Cidadão Honorário': 'لقب المواطن الفخري',
    'Certificado de Reconhecimento': 'شهادة تقدير',
    'Moção de Aplausos': 'تصفيق حار',
    'Homenagem Especial': 'تكريم خاص',
    'Diploma de Honra ao Mérito': 'دبلوم الشرف والجدارة',
    'Título de Embaixador': 'لقب سفير',
    'Comenda': 'وسام',
    'Medalha de Honra': 'ميدالية الشرف',
    'Assembleia Legislativa do Estado de Goiás': 'الجمعية التشريعية لولاية غوياس',
    'Câmara Municipal de Goiânia': 'مجلس مدينة غويانيا',
    'Câmara Municipal': 'مجلس المدينة',
    'Senado Federal': 'مجلس الشيوخ الاتحادي',
    'Congresso Nacional': 'الكونغرس الوطني',
    'Deputado Estadual': 'نائب ولاية',
    'Deputado Federal': 'نائب اتحادي',
    'Vereador': 'عضو مجلس المدينة',
    'Senador': 'عضو مجلس الشيوخ',
  },
  zh: {
    'Prova social mundial': '全球社会认证',
    'Prova social': '社会认证',
    'Homenageado por deputados': '受到议员表彰',
    'Honraria Solene': '庄严荣誉',
    'Título de Cidadão Honorário': '荣誉公民称号',
    'Certificado de Reconhecimento': '认可证书',
    'Moção de Aplausos': '掌声动议',
    'Homenagem Especial': '特别致敬',
    'Diploma de Honra ao Mérito': '荣誉功勋文凭',
    'Título de Embaixador': '大使称号',
    'Comenda': '勋章',
    'Medalha de Honra': '荣誉奖章',
    'Assembleia Legislativa do Estado de Goiás': '戈亚斯州立法议会',
    'Câmara Municipal de Goiânia': '戈亚尼亚市议会',
    'Câmara Municipal': '市议会',
    'Senado Federal': '联邦参议院',
    'Congresso Nacional': '国家国会',
    'Deputado Estadual': '州议员',
    'Deputado Federal': '联邦议员',
    'Vereador': '市议员',
    'Senador': '参议员',
  },
  es: {
    'Prova social mundial': 'Prueba social mundial',
    'Prova social': 'Prueba social',
    'Homenageado por deputados': 'Homenajeado por diputados',
    'Honraria Solene': 'Honra Solemne',
    'Título de Cidadão Honorário': 'Título de Ciudadano Honorario',
    'Certificado de Reconhecimento': 'Certificado de Reconocimiento',
    'Moção de Aplausos': 'Moción de Aplausos',
    'Homenagem Especial': 'Homenaje Especial',
    'Diploma de Honra ao Mérito': 'Diploma de Honor al Mérito',
    'Título de Embaixador': 'Título de Embajador',
    'Comenda': 'Condecoración',
    'Medalha de Honra': 'Medalla de Honor',
    'Assembleia Legislativa do Estado de Goiás': 'Asamblea Legislativa del Estado de Goiás',
    'Câmara Municipal de Goiânia': 'Cámara Municipal de Goiânia',
    'Câmara Municipal': 'Cámara Municipal',
    'Senado Federal': 'Senado Federal',
    'Congresso Nacional': 'Congreso Nacional',
    'Deputado Estadual': 'Diputado Estatal',
    'Deputado Federal': 'Diputado Federal',
    'Vereador': 'Concejal',
    'Senador': 'Senador',
  },
};

// ---------- 3. Função de tradução ----------
function translateCell(text, dict) {
  if (!text || typeof text !== 'string') return text;
  const trimmed = text.trim();
  // Procura correspondência exata
  if (dict[trimmed]) return dict[trimmed];
  // Procura correspondência parcial (caso o texto contenha a chave)
  for (const [pt, translated] of Object.entries(dict)) {
    if (trimmed.toLowerCase().includes(pt.toLowerCase())) {
      return trimmed.replace(new RegExp(pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), translated);
    }
  }
  // Sem tradução encontrada — mantém o original
  return text;
}

// ---------- 4. Gerar os 6 XLS ----------
for (const [lang, dict] of Object.entries(translations)) {
  const translatedRows = rows.map(row => {
    if (!row || !row[0]) return row;
    return [
      row[0],                              // Col A — nome do arquivo (nunca muda)
      translateCell(row[1], dict),          // Col B — social proof
      translateCell(row[2], dict),          // Col C — line1
      translateCell(row[3], dict),          // Col D — line2
      translateCell(row[4], dict),          // Col E — line3
    ];
  });

  const newWs = XLSX.utils.aoa_to_sheet(translatedRows);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, newWs, 'Titulos');

  const outPath = path.join(DIR, `Titulos_${lang}.xls`);
  XLSX.writeFile(newWb, outPath, { bookType: 'biff8' });
  console.log(`✅ Criado: ${outPath}`);
}

// ---------- 5. Também exporta o JSON pra conferência ----------
const jsonPath = path.join(DIR, 'Titulos_original.json');
fs.writeFileSync(jsonPath, JSON.stringify(rows, null, 2), 'utf-8');
console.log(`\n📄 JSON de referência salvo em: ${jsonPath}`);
console.log('\n🎉 Pronto! Agora edite cada XLS no Excel/LibreOffice para revisar as traduções.');
