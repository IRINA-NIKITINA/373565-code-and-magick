'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 20;
var FONT_GAP = 16;
var TEXT_WIDTH = 50;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 150;
var barHeight = GIST_HEIGHT - GAP;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  if(arr.length === 0 || arr === null){
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

var renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  
  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  
  var maxTime = getMaxElement(times);
  
  for (var i = 0; i < names.length; i++) {

    var rectHeight = (barHeight * times[i]) / maxTime;
    var yRect = CLOUD_Y + CLOUD_HEIGHT - GAP * 1.5 - FONT_GAP - rectHeight;
    var xRect = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;
  	
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xRect, CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP);
    ctx.fillText(Math.round(times[i]), xRect, yRect - FONT_GAP - GAP / 3);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', 255,' + Math.round(Math.random() * 255) + ')';
    }
    ctx.fillRect(xRect, yRect, BAR_WIDTH, rectHeight);   
  }
};
