const arrLangNames = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh'];
const priceMonthly = 9.99;
const priceYear = 19.99;
const arrLinksForButton = ['https://apple.com/', ' https://google.com/'];

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
  .then((langData) => {
    localize(langData);
  });

const localize = function (langData) {
  const bannerTitleElement = document.querySelector('.banner__title');
  bannerTitleElement.innerHTML =
    langData['Unlimited Access<br>to All Features'];
  if (lang == 'fr' || lang == 'ru')
    bannerTitleElement.style.fontSize = '2.6rem';

  const unlimitedDocsElement = document.querySelector('#unlimited-docs');
  unlimitedDocsElement.innerHTML = langData['Unlimited documents'];

  const countModeElement = document.querySelector('#count-mode');
  countModeElement.innerHTML = langData['Count mode'];

  const recognitionElement = document.querySelector('#recognition');
  recognitionElement.innerHTML = langData['Text recognition (OCR)'];

  const monthlyElement = document.querySelector('#monthly');
  monthlyElement.innerHTML = langData['Monthly'];

  const monthlyPriceElement = document.querySelector('#price-monthly');
  monthlyPriceElement.innerHTML = langData[
    '<strong>{{price}}</strong><br>per month'
  ].replace('{{price}}', `$${priceMonthly}`);

  const monthlyInfoElement = document.querySelector('#monthly-info');
  monthlyInfoElement.innerHTML = langData[`3 DAYS FREE`];

  const pricePerMonthElement = document.querySelector('#price-per-month1');
  pricePerMonthElement.innerHTML = langData[`{{price}}/month`].replace(
    '{{price}}',
    `$${priceMonthly}`
  );

  const annuallyElement = document.querySelector('#annually');
  annuallyElement.innerHTML = langData['Annually'];
  if (lang == 'fr') {
    annuallyElement.style.fontSize = '1.3rem';
    monthlyInfoElement.style.fontSize = '1.3rem';
  }

  const yearPriceElement = document.querySelector('#price-year');
  yearPriceElement.innerHTML = langData[
    '<strong>{{price}}</strong><br>per year'
  ].replace('{{price}}', `$${priceYear}`);

  const yearInfoElement = document.querySelector('#year-info');
  yearInfoElement.innerHTML = langData['MOST POPULAR'];

  const discountElement = document.querySelector('#discount');
  discountElement.innerHTML = langData['-83%'];

  const pricePerMonthYearElement = document.querySelector('#price-per-month2');
  pricePerMonthYearElement.innerHTML = langData[`{{price}}/month`].replace(
    '{{price}}',
    `$${Math.floor((priceYear * 100) / 12) / 100}`
  );

  const buttonElement = document.querySelector('#button-continue');
  buttonElement.innerHTML = langData['Continue'];

  const remarkElement = document.querySelector('#remark');
  remarkElement.innerHTML = langData['Auto-renewable. Cancel anytime.'];

  const termsElement = document.querySelector('#terms');
  termsElement.innerHTML = langData['Terms of Use'];

  const privacyElement = document.querySelector('#privacy');
  privacyElement.innerHTML = langData['Privacy Policy'];

  const restoreElement = document.querySelector('#restore');
  restoreElement.innerHTML = langData['Restore'];
};

const setEventHandlers = function (e) {
  const offersList = document.querySelector('.offers__list');

  offersList.addEventListener('click', (e) => {
    const parent = e.target.closest('.offers__item');
    if (parent) {
      if (!parent.classList.contains('offers__item_active')) {
        toggleOfferStyle(offersList, parent);
        setLinkToButton(offersList, parent);
      }
    }
  });
};

const toggleOfferStyle = function (offersList, activeItem) {
  offersList
    .querySelectorAll('.offers__item')
    .forEach((element) => element.classList.remove('offers__item_active'));
  activeItem.classList.add('offers__item_active');
};

const setLinkToButton = function (offersList, activeItem) {
  const index = [...offersList.children].findIndex(
    (item) => item === activeItem
  );
  document.querySelector('#button-continue').href = arrLinksForButton[index];
  console.log(index);
};

window.addEventListener('load', setEventHandlers);
