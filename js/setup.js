'use strict';

var COUNT_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var wizards = [];
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatsColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
var similarList = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var form = setup.querySelector('.setup-wizard-form');
var setupSubmit = form.querySelector('.setup-submit');
var wizardCoat = form.querySelector('.wizard-coat');
var wizardEyes = form.querySelector('.wizard-eyes');
var setupFireballWrap = form.querySelector('.setup-fireball-wrap');

var getRandInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getName = function (arrName, arrSurname) {
  var name = arrName[getRandInRange(0, arrName.length - 1)];
  var surname = arrSurname[getRandInRange(0, arrSurname.length - 1)];
  return getRandInRange(0, 1) ? (name + ' ' + surname) : (surname + ' ' + name);
};

var getArraySimilarWizards = function (templ, arr) {
  var elements = [];
  for (var i = 0; i < arr.length; i++) {
    var element = templ.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = arr[i].name;
    element.querySelector('.wizard-coat').style.fill = arr[i].coatColor;
    element.querySelector('.wizard-eyes').style.fill = arr[i].eyesColor;
    elements.push(element);
  }
  return elements;
};

var addSimilarWizards = function (arr, block) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  block.appendChild(fragment);
};

for (var i = 0; i < COUNT_WIZARDS; i++) {
  var wizard = {
    'name': getName(names, surnames),
    'coatColor': coatsColors[getRandInRange(0, coatsColors.length - 1)],
    'eyesColor': eyesColors[getRandInRange(0, eyesColors.length - 1)]
  };
  wizards.push(wizard);
}

document.querySelector('.setup').classList.remove('hidden');
addSimilarWizards(getArraySimilarWizards(template, wizards), similarList);
document.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (setupUserName !== document.activeElement) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }
};

var sendForm = function (evt) {
  evt.preventDefault();
  form.action = 'https://js.dump.academy/code-and-magick';
  form.submit();
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var getChangeColor = function (oldColor, newColor, arr) {
  while (oldColor === newColor) {
    newColor = arr[getRandInRange(0, arr.length - 1)];
  }
  return newColor;
};

var fillForm = function (elementName, inputName, arr) {
  var oldColor = form.querySelector('[name = ' + inputName + ']').value;
  var newColor = arr[getRandInRange(0, arr.length - 1)];
  newColor = getChangeColor(oldColor, newColor, arr);
  if (inputName === 'fireball-color') {
    elementName.style.background = newColor;
  } else {
    elementName.style.fill = newColor;
  }
  form.querySelector('[name = ' + inputName + ']').value = newColor;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupSubmit.addEventListener('click', function (evt) {
  sendForm(evt);
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    sendForm(evt);
  }
});

wizardCoat.addEventListener('click', function () {
  fillForm(wizardCoat, 'coat-color', coatsColors);
});

wizardEyes.addEventListener('click', function () {
  fillForm(wizardEyes, 'eyes-color', eyesColors);
});

setupFireballWrap.addEventListener('click', function () {
  fillForm(setupFireballWrap, 'fireball-color', fireballColors);
});
