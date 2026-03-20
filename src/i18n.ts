import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Criador > Decisor > Orquestrador',
      bio: 'Criando novos mundos reciclando sentimentos.',
      saveContact: 'Salvar na Agenda',
      prev: 'Anterior',
      next: 'Próximo',
      rights: 'Todos os direitos reservados',
      loading: 'Carregando...',
      errorLoading: 'Erro ao carregar dados',
    },
  },
  en: {
    translation: {
      name: 'Prince André Luís',
      role: 'Creator > Decider > Orchestrator',
      bio: 'Creating new worlds by recycling feelings.',
      saveContact: 'Save to Contacts',
      prev: 'Previous',
      next: 'Next',
      rights: 'All Rights Reserved',
      loading: 'Loading...',
      errorLoading: 'Error loading data',
    },
  },
  he: {
    translation: {
      name: 'הנסיך אנדרה לואיס',
      role: 'יוצר > מחליט > תזמורן',
      bio: 'יוצר עולמות חדשים על ידי מיחזור רגשות.',
      saveContact: 'שמור לאנשי קשר',
      prev: 'הקודם',
      next: 'הבא',
      rights: 'כל הזכויות שמורות',
      loading: 'טוען...',
      errorLoading: 'שגיאה בטעינת נתונים',
    },
  },
  ar: {
    translation: {
      name: 'الأمير أندريه لويس',
      role: 'مبتكر > صانع قرار > منسق',
      bio: 'خلق عوالم جديدة من خلال إعادة تدوير المشاعر.',
      saveContact: 'حفظ في جهات الاتصال',
      prev: 'السابق',
      next: 'التالي',
      rights: 'جميع الحقوق محفوظة',
      loading: 'جاري التحميل...',
      errorLoading: 'خطأ في تحميل البيانات',
    },
  },
  ru: {
    translation: {
      name: 'Принц Андре Луис',
      role: 'Создатель > Решатель > Оркестратор',
      bio: 'Создание новых миров путем переработки чувств.',
      saveContact: 'Сохранить в контакты',
      prev: 'Назад',
      next: 'Вперед',
      rights: 'Все права защищены',
      loading: 'Загрузка...',
      errorLoading: 'Ошибка загрузки данных',
    },
  },
  zh: {
    translation: {
      name: '安德烈·路易斯王子',
      role: '创造者 > 决策者 > 管弦者',
      bio: '通过回收情感创造新世界。',
      saveContact: '保存到通讯录',
      prev: '上一个',
      next: '下一个',
      rights: '版权所有',
      loading: '加载中...',
      errorLoading: '数据加载错误',
    },
  },
  es: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Creador > Decisor > Orquestrador',
      bio: 'Creando nuevos mundos reciclando sentimientos.',
      saveContact: 'Guardar en Contactos',
      prev: 'Anterior',
      next: 'Siguiente',
      rights: 'Todos los derechos reservados',
      loading: 'Cargando...',
      errorLoading: 'Error al cargar datos',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
