'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 20;
var FONT_GAP = 16;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 150;
var barHeight = GIST_HEIGHT - GAP;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var renderCloud = function (context, x, y, color) {
  context.fillStyle = color;
  context.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length === 0 || arr === null) {
    return null;
  }
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderStatistics = function (context, names, times) {
  renderCloud(context, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(context, CLOUD_X, CLOUD_Y, '#fff');
  context.fillStyle = '#000';

  context.font = '16px PT Mono';
  context.textBaseline = 'hanging';
  context.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  context.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var rectHeight = (barHeight * times[i]) / maxTime;
    var yRect = CLOUD_Y + CLOUD_HEIGHT - GAP * 1.5 - FONT_GAP - rectHeight;
    var xRect = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
    context.fillStyle = '#000';
    context.fillText(names[i], xRect, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    context.fillText(Math.round(times[i]), xRect, yRect - FONT_GAP - GAP / 3);
    if (names[i] === 'Вы') {
      context.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      context.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', 255,' + Math.round(Math.random() * 255) + ')';
    }
    context.fillRect(xRect, yRect, BAR_WIDTH, rectHeight);
  }
};

renderStatistics(ctx, names, times);
