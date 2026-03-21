'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Criador > Decisor > Orquestrador',
      bio: 'Criando novos mundos reciclando sentimentos.',
      saveContact: 'Salvar na Agenda',
      socialProof: 'Prova social mundial',
      prev: 'Anterior',
      next: 'Próximo',
      rights: 'Todos os direitos reservados',
    }
  },
  en: {
    translation: {
      name: 'Prince André Luís',
      role: 'Creator > Decider > Orchestrator',
      bio: 'Creating new worlds by recycling feelings.',
      saveContact: 'Save to Contacts',
      socialProof: 'World Social Proof',
      prev: 'Previous',
      next: 'Next',
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
      prev: 'הקודם',
      next: 'הבא',
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
      prev: 'السابق',
      next: 'التالي',
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
      prev: 'Назад',
      next: 'Вперед',
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
      prev: '上一个',
      next: '下一个',
      rights: '版权所有',
    }
  },
  es: {
    translation: {
      name: 'Príncipe André Luís',
      role: 'Creador > Decisor > Orquestrador',
      bio: 'Creando nuevos mundos reciclando sentimientos.',
      saveContact: 'Guardar en Contactos',
      socialProof: 'Prueba social mundial',
      prev: 'Anterior',
      next: 'Siguiente',
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
