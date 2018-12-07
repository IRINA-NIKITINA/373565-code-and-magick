'use strict';

(function () {
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

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var setupSubmit = form.querySelector('.setup-submit');
  var wizardCoat = form.querySelector('.wizard-coat');
  var wizardEyes = form.querySelector('.wizard-eyes');
  var setupFireballWrap = form.querySelector('.setup-fireball-wrap');

  var onSendForm = function (evt) {
    window.backend.save(new FormData(form), onLoad, onError);
    evt.preventDefault();
  };

  var onLoad = function (response) {
      setup.classList.add('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    
    node.textContent = errorMessage; 
    document.body.insertAdjacentElement('afterbegin', node);
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
    fillForm(wizardCoat, 'coat-color', coatsColors);
  });

  wizardEyes.addEventListener('click', function () {
    fillForm(wizardEyes, 'eyes-color', eyesColors);
  });

  setupFireballWrap.addEventListener('click', function () {
    fillForm(setupFireballWrap, 'fireball-color', fireballColors);
  });

})();
