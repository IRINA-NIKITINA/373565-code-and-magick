'use strict';

(function () {
  var COUNT_WIZARDS = 4;
   
    var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');
var similarList = setup.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('div');

  var getArraySimilarWizards = function (templ, arr) {
    var elements = [];
    for (var i = 0; i < arr.length; i++) {
      var element = templ.cloneNode(true);
      element.querySelector('.setup-similar-label').textContent = arr[i].name;
      element.querySelector('.wizard-coat').style.fill = arr[i].colorCoat;
      element.querySelector('.wizard-eyes').style.fill = arr[i].colorEyes;
      elements.push(element);
    }
    return elements;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_WIZARDS; i++) {
      fragment.appendChild(getArraySimilarWizards(template, wizards)[i]);
    }
    similarList.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
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

  window.backend.load(onLoad, onError);

})();
