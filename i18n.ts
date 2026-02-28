import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Criador > Decisor > Orquestrador',
      bio: 'Criando novos mundos reciclando sentimentos.',
      saveContact: 'Salvar na Agenda',
      socialProof: 'Prova Social',
      featuredTitle: 'Homenageado por deputados',
      featuredLocation: 'Assembleia Legislativa do Estado de Goiás',
      featuredHonor: 'Honraria Solene',
      prev: 'Anterior',
      next: 'Próximo',
      confira: 'Confira',
      titlesSection: 'Títulos, homenagens \ncertificações e honrarias',
      rights: 'Todos os direitos reservados',
    }
  },
  en: {
    translation: {
      name: 'Prince André Luís',
      role: 'Creator > Decider > Orchestrator',
      bio: 'Creating new worlds by recycling feelings.',
      saveContact: 'Save to Contacts',
      socialProof: 'Social Proof',
      featuredTitle: 'Honored by deputies',
      featuredLocation: 'Legislative Assembly of the State of Goiás',
      featuredHonor: 'Solemn Honor',
      prev: 'Previous',
      next: 'Next',
      confira: 'Check it out',
      titlesSection: 'Titles, tributes \ncertifications and honors',
      rights: 'All Rights Reserved',
    }
  },
  he: {
    translation: {
      name: 'הנסיך אנדרה לואיס',
      role: 'יוצר > מחליט > תזמורן',
      bio: 'יוצר עולמות חדשים על ידי מיחזור רגשות.',
      saveContact: 'שמור לאנשי קשר',
      socialProof: 'הוכחה חברתית',
      featuredTitle: 'זכה לכבוד מצד חברי הפרלמנט',
      featuredLocation: 'האספה המחוקקת של מדינת גויאס',
      featuredHonor: 'כבוד חגיגי',
      prev: 'הקודם',
      next: 'הבא',
      confira: 'בדוק את זה',
      titlesSection: 'תארים, מחוות \nהסמכות ועיטורים',
      rights: 'כל הזכויות שמורות',
    }
  },
  ar: {
    translation: {
      name: 'الأمير أندريه لويس',
      role: 'مبتكر > صانع قرار > منسق',
      bio: 'خلق عوالم جديدة من خلال إعادة تدوير المشاعر.',
      saveContact: 'حفظ في جهات الاتصال',
      socialProof: 'دليل اجتماعي',
      featuredTitle: 'كرمه النواب',
      featuredLocation: 'الجمعية التشريعية لولاية غوياس',
      featuredHonor: 'تكريم رسمي',
      prev: 'السابق',
      next: 'التالي',
      confira: 'تحقق من ذلك',
      titlesSection: 'الألقاب والتكريمات \nوالشهادات والأوسمة',
      rights: 'جميع الحقوق محفوظة',
    }
  },
  ru: {
    translation: {
      name: 'Принц Андре Луис',
      role: 'Создатель > Решатель > Оркестратор',
      bio: 'Создание новых миров путем переработки чувств.',
      saveContact: 'Сохранить в контакты',
      socialProof: 'Социальное доказательство',
      featuredTitle: 'Удостоен чести депутатами',
      featuredLocation: 'Законодательное собрание штата Гояс',
      featuredHonor: 'Торжественная награда',
      prev: 'Назад',
      next: 'Вперед',
      confira: 'Проверить',
      titlesSection: 'Титулы, дани \nсертификаты и почести',
      rights: 'Все права защищены',
    }
  },
  zh: {
    translation: {
      name: '安德烈·路易斯王子',
      role: '创造者 > 决策者 > 管弦者',
      bio: '通过回收情感创造新世界。',
      saveContact: '保存到通讯录',
      socialProof: '社会证明',
      featuredTitle: '受到议员表彰',
      featuredLocation: '戈亚斯州立法议会',
      featuredHonor: '庄严荣誉',
      prev: '上一个',
      next: '下一个',
      confira: '查看',
      titlesSection: '头衔、致敬 \n认证和荣誉',
      rights: '版权所有',
    }
  },
  es: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Creador > Decisor > Orquestrador',
      bio: 'Creando nuevos mundos reciclando sentimientos.',
      saveContact: 'Guardar en Contactos',
      socialProof: 'Prueba Social',
      featuredTitle: 'Homenajeado por diputados',
      featuredLocation: 'Asamblea Legislativa del Estado de Goiás',
      featuredHonor: 'Honra Solemne',
      prev: 'Anterior',
      next: 'Siguiente',
      confira: 'Echa un vistazo',
      titlesSection: 'Títulos, homenajes \ncertificaciones y honores',
      rights: 'Todos los derechos reservados',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
