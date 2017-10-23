var height, width, func, isGraph, scalingFactor = 100; //pixels / coord

function plotLine(ctx, xo, yo, xf, yf){
  ctx.moveTo(xo, yo);
  ctx.lineTo(xf, yf);
  ctx.stroke();
}

function plotPoint(ctx, x, y){
  ctx.fillRect(x, y, 2, 2);
}

function throwError(error){
  $("#error").html(error);
}

function convertToRectCoords(x, y){
  mouseX = x - $(window).width() * 0.25 - width / 2;
  mouseY = height / 2 - y;

  return {x: mouseX /= scalingFactor, y: mouseY /= scalingFactor};
}

function generateHex(){
  return '#' + (function co(lor){   return (lor +=
  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
}

function sign(num){
  if(num <= 0) return 0;
  else if(num > 0) return 1;
}

$(document).ready(function(){
  if($(window).width() < 1000){
    $("#mobile-warning").show();
    $("#wrapper").hide();
  }
  else{
    $("#wrapper").show();
    height = $(window).height();
    width = $(window).width() * 0.75;

    $("#graph-canvas")[0].width = width;
    $("#graph-canvas")[0].height = height;
  }

  //Click and Hover handlers
  $("#graph-canvas").click(function(e) {
    var coords = convertToRectCoords(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

    var fx = math.derivative(func, "x").eval({x: coords.x, y: coords.y});
    var fy = math.derivative(func, "y").eval({x: coords.x, y: coords.y});
    var fxx = math.derivative(math.derivative(func, "x"), "x").eval({x: coords.x, y: coords.y});
    var fyy = math.derivative(math.derivative(func, "y"), "y").eval({x: coords.x, y: coords.y});
    var fxy = math.derivative(math.derivative(func, "x"), "y").eval({x: coords.x, y: coords.y});

    $("#fx").html(fx);
    $("#fy").html(fy);
    $("#fxx").html(fxx);
    $("#fyy").html(fyy);
    $("#fxy").html(fxy);

    $("#partialderivatives").show();
  });

  $("#graph-canvas").mousemove(function(e) {
    var x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;

    var coords = convertToRectCoords(x, y);
    $("#tooltip").show();
    $("#tooltip").html(coords.x.toFixed(4) + ", " + coords.y.toFixed(4));
    $("#tooltip").css({
      "left": (x + 100 < $(window).width() ? x - $(window).width() * 0.25 + 20 : x - $(window).width() * 0.25 - 120),
      "top": (y + 40 < $(window).height() ? y + 20 : y - 60)
    });
  });

  $("#graph-canvas").mouseleave(function(e) {
    $("#tooltip").hide();
  });

  $(window).resize(function(){
    if($(window).width() < 1000){
      $("#mobile-warning").show();
      $("#wrapper").hide();
    }
    else{
      $("#mobile-warning").hide();
      $("#wrapper").show();

      height = $(window).height();
      width = $(window).width() * 0.75;
      $("#graph-canvas")[0].width = width;
      $("#graph-canvas")[0].height = height;

      if(isGraph){
        plotLevelCurves();
      }
    }
  });
});

function zoomIn(){
  scalingFactor *= 10;
  plotLevelCurves();
}

function zoomOut(){
  scalingFactor /= 10;
  plotLevelCurves();
}

function plotLevelCurves(){
  //Reset
  $("#error").html("");
  $("#partialderivatives").hide();
  $("#graph").show();
  isGraph = true;

  //Make sure input is valid
  func = $("#function").val();
  var node = math.parse(func);

  try{ node.eval({x: 0, y: 0});}
  catch(e){
    throwError("Please enter a valid function");
    return;
  }
  if($("#function").val().length == 0){
    throwError("Please enter a function to plot");
    return;
  }
  else if($("#levelcurves").val().length == 0){
    throwError("Please enter level curves to plot");
    return;
  }

  /*
    GRAPH LEVEL CURVES
  */

  var canvas = document.getElementById("graph-canvas");
  var ctx = canvas.getContext("2d");

  ctx.font = "20px crimsontext";
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  $("#loading").show();

  setTimeout(function(){
    //Plot axes w/ labels
    ctx.beginPath();
    plotLine(ctx, 0, height / 2, width, height / 2); //X axis
    ctx.fillText("x", width - 20, height / 2 + 20);

    plotLine(ctx, width / 2, 0, width / 2, height); //Y axis
    ctx.fillText("y", width / 2 + 15, 20);

    //Plot ticks
    var orderOfMagnitudeX, orderOfMagnitudeY;

    if(width / 2 / scalingFactor < 1){
      var temp = ("" + width / 2 / scalingFactor).split(".")[1];
      for(var i = 0; i < temp.length; i++){
        if(temp.charAt(i) !== "0"){
          orderOfMagnitudeX = Math.pow(10, -i - 1);
          break;
        }
      }
    }
    else orderOfMagnitudeX = ("" + Math.trunc(width / 2 / scalingFactor)).length;

    if(height / 2 / scalingFactor < 1){
      var temp = ("" + height / 2 / scalingFactor).split(".")[1];
      for(var i = 0; i < temp.length; i++){
        if(temp.charAt(i) !== "0"){
          orderOfMagnitudeY = Math.pow(10, -i - 1);
          break;
        }
      }
    }
    else orderOfMagnitudeY = ("" + Math.trunc(height / 2 / scalingFactor)).length;

    for(var i = 0; i < width / 2; i += scalingFactor * orderOfMagnitudeX){
      plotLine(ctx, width / 2 + i, height / 2 - 10, width / 2 + i, height / 2 + 10);
      plotLine(ctx, width / 2 - i, height / 2 - 10, width / 2 - i, height / 2 + 10);
    }

    for(var j = 0; j < width / 2; j += scalingFactor * orderOfMagnitudeX){
      plotLine(ctx, width / 2 - 10, height / 2 + j, width / 2 + 10, height / 2 + j);
      plotLine(ctx, width / 2 - 10, height / 2 - j, width / 2 + 10, height / 2 - j);
    }
    ctx.closePath();

    ctx.fillText("" + orderOfMagnitudeX, width / 2 + scalingFactor * orderOfMagnitudeX - 5, height / 2 + 30);
    ctx.fillText("" + orderOfMagnitudeY, width / 2 + 10, height / 2 - scalingFactor * orderOfMagnitudeY + 5);

    //Plot each level curve
    var level, pointFound, x, y, fx;

    ctx.font = "14px crimsontext";

    var levels = $("#levelcurves").val().split(",");
    for(var l = 0; l < levels.length; l++){
      level = levels[l];
      ctx.fillStyle = generateHex();
      ctx.strokeStyle = ctx.fillStyle;
      pointFound = false;

      for(x = 0; x <= width; x += scalingFactor / 50){
        for(y = 0; y <= height; y += scalingFactor / 50){
          value = node.eval({x: (x - width / 2) / scalingFactor, y: (height / 2 - y) / scalingFactor});

          if(Math.abs(value - level) <= 0.01) {
            if(!pointFound){
              ctx.fillText("z = " + level, x + 10, y + 20);
              pointFound = true;
            }

            plotPoint(ctx, x, y);
          }
        }
      }

    }

    $("#loading").hide();
  }, 0);
}
