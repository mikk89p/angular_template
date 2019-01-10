// app/translate/translation.ts
// https://scotch.io/tutorials/simple-language-translation-in-angular-2-part-1


// In Angular4 OpaqueToken is deprecated and will be replaced by InjectionToken. InjectionToken allows to pass a generic type parameter.
import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';
// import { LANG_ZH_NAME, LANG_ZH_TRANS } from './lang-zh';

// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all translations
export const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_ES_NAME]: LANG_ES_TRANS,
  // [LANG_ZH_NAME]: LANG_ZH_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS,
    useValue: dictionary
  },
];
