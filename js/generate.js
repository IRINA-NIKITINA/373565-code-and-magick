'use strict';

(function () {
  var COUNT_WIZARDS = 4;
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

  var setup = document.querySelector('.setup');

  var getName = function (arrName, arrSurname) {
    var name = arrName[window.util.getRandInRange(0, arrName.length - 1)];
    var surname = arrSurname[window.util.getRandInRange(0, arrSurname.length - 1)];

    return window.util.getRandInRange(0, 1) ? (name + ' ' + surname) : (surname + ' ' + name);
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
      'coatColor': coatsColors[window.util.getRandInRange(0, coatsColors.length - 1)],
      'eyesColor': eyesColors[window.util.getRandInRange(0, eyesColors.length - 1)]
    };
    wizards.push(wizard);
  }

  var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
  var similarList = setup.querySelector('.setup-similar-list');

  setup.classList.remove('hidden');
  setup.querySelector('.setup-similar').classList.remove('hidden');

  addSimilarWizards(getArraySimilarWizards(template, wizards), similarList);

  window.generate = {
    coatsColors: coatsColors,
    eyesColors: eyesColors
  };

}) ();
