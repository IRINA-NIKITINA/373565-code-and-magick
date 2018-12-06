'use strict';

(function () {
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var setupSubmit = form.querySelector('.setup-submit');
  var wizardCoat = form.querySelector('.wizard-coat');
  var wizardEyes = form.querySelector('.wizard-eyes');
  var setupFireballWrap = form.querySelector('.setup-fireball-wrap');

  var onSendForm = function (evt) {
    evt.preventDefault();
    form.action = 'https://js.dump.academy/code-and-magick';
    form.submit();
  };

  var getChangeColor = function (oldColor, newColor, array) {
    while (oldColor === newColor) {
      newColor = array[window.util.getRandInRange(0, array.length - 1)];
    }
    return newColor;
  };

  var fillForm = function (elementName, inputName, arr) {
    var oldColor = form.querySelector('[name = ' + inputName + ']').value;
    var newColor = arr[window.util.getRandInRange(0, arr.length - 1)];

    newColor = getChangeColor(oldColor, newColor, arr);

    if (inputName === 'fireball-color') {
      elementName.style.background = newColor;
    } else {
      elementName.style.fill = newColor;
    }

    form.querySelector('[name = ' + inputName + ']').value = newColor;
  };

  setupSubmit.addEventListener('click', onSendForm);

  setupSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onSendForm(evt);
    }
  });

  wizardCoat.addEventListener('click', function () {
    fillForm(wizardCoat, 'coat-color', window.generate.coatsColors);
  });

  wizardEyes.addEventListener('click', function () {
    fillForm(wizardEyes, 'eyes-color', window.generate.eyesColors);
  });

  setupFireballWrap.addEventListener('click', function () {
    fillForm(setupFireballWrap, 'fireball-color', fireballColors);
  });

})();
