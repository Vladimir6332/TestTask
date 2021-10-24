const arrLangNames = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];

let lang = navigator.language || navigator.userLanguage || 'en';

const query = window.location.search;
if (query.startsWith('?lang=')) {
  lang = query.substring(6);
}
lang = lang.slice(0, 2);
if (!arrLangNames.includes(lang)) {
  lang = 'en';
}

fetch(`./src/localizations/${lang}.json`)
  .then((res) => res.json())
  .then((langData) => console.log(langData));

console.log(lang);
