'use strict';
(function () {
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
  var BAR_HEIGHT = GIST_HEIGHT - GAP;
  var MAIN_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var NAME_Y = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getRandomColor = function () {
    return Math.round(Math.random() * 255);
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

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    ctx.fillStyle = '#000';

    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

    var maxTime = getMaxElement(times);

    if (maxTime !== null) {
      for (var i = 0; i < names.length; i++) {
        var rectHeight = (BAR_HEIGHT * times[i]) / maxTime;
        var yRect = CLOUD_Y + CLOUD_HEIGHT - GAP * 1.5 - FONT_GAP - rectHeight;
        var xRect = CLOUD_X + GAP * 2 + (BAR_WIDTH + BAR_GAP) * i;

        ctx.fillStyle = '#000';
        ctx.fillText(names[i], xRect, NAME_Y);
        ctx.fillText(Math.round(times[i]), xRect, yRect - FONT_GAP - GAP / 3);

        if (names[i] === 'Вы') {
          ctx.fillStyle = MAIN_PLAYER_COLOR;
        } else {
          ctx.fillStyle = 'rgba(' + getRandomColor() + ', ' + getRandomColor() + ', 255,' + getRandomColor() + ')';
        }

        ctx.fillRect(xRect, yRect, BAR_WIDTH, rectHeight);
      }
    }
  };
})();
