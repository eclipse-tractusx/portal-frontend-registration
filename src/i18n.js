import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translations.json'
import de from './locales/de/translations.json'
import helpEN from './locales/en/help.json'
import helpDE from './locales/de/help.json'

const resources = {
  de: {
    translation: de,
    help: helpDE,
  },
  en: {
    translation: en,
    help: helpEN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
