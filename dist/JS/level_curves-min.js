function plotLine(t,i,e,h,o){t.moveTo(i,e),t.lineTo(h,o),t.stroke()}function plotPoint(t,i,e){t.fillRect(i,e,2,2)}function throwError(t){$("#error").html(t)}function convertToRectCoords(t,i){return mouseX=t-.25*$(window).width()-width/2,mouseY=height/2-i,{x:mouseX/=scalingFactor,y:mouseY/=scalingFactor}}function sign(t){return t<=0?0:t>0?1:void 0}function zoomIn(){scalingFactor*=10,plotLevelCurves()}function zoomOut(){scalingFactor/=10,plotLevelCurves()}function plotLevelCurves(){$("#error").html(""),$("#partialderivatives").hide(),$("#graph").show(),isGraph=!0,func=$("#function").val();var t=math.parse(func);try{t.eval({x:0,y:0})}catch(t){return void throwError("Please enter a valid function")}if(0!=$("#function").val().length)if(0!=$("#levelcurves").val().length){var i=document.getElementById("graph-canvas"),e=i.getContext("2d");e.font="20px crimsontext",e.fillStyle="#000000",e.strokeStyle="#000000",e.clearRect(0,0,i.width,i.height),$("#loading").show(),setTimeout(function(){e.beginPath(),plotLine(e,0,height/2,width,height/2),e.fillText("x",width-20,height/2+20),plotLine(e,width/2,0,width/2,height),e.fillText("y",width/2+15,20);var i,h;if(width/2/scalingFactor<1){for(var o=(""+width/2/scalingFactor).split(".")[1],a=0;a<o.length;a++)if("0"!==o.charAt(a)){i=Math.pow(10,-a-1);break}}else i=(""+Math.trunc(width/2/scalingFactor)).length;if(height/2/scalingFactor<1){for(var o=(""+height/2/scalingFactor).split(".")[1],a=0;a<o.length;a++)if("0"!==o.charAt(a)){h=Math.pow(10,-a-1);break}}else h=(""+Math.trunc(height/2/scalingFactor)).length;for(a=0;a<width/2;a+=scalingFactor*i)plotLine(e,width/2+a,height/2-10,width/2+a,height/2+10),plotLine(e,width/2-a,height/2-10,width/2-a,height/2+10);for(var r=0;r<width/2;r+=scalingFactor*i)plotLine(e,width/2-10,height/2+r,width/2+10,height/2+r),plotLine(e,width/2-10,height/2-r,width/2+10,height/2-r);e.closePath(),e.fillText(""+i,width/2+scalingFactor*i-5,height/2+30),e.fillText(""+h,width/2+10,height/2-scalingFactor*h+5);var n,l,c,d,s,w,g;e.font="14px crimsontext";for(var v=$("#levelcurves").val().split(","),f=0;f<v.length;f++){for(n=v[f],e.fillStyle=randomColor({luminosity:"dark",format:"hex"}),e.strokeStyle=e.fillStyle,e.beginPath(),l=!1,c=0;c<=width;c+=2)for(d=0;d<=height;d+=2)s=(c-width/2)/scalingFactor,w=(height/2-d)/scalingFactor,value=t.eval({x:s,y:w}),Math.abs(value-n)<=.01&&(l||(e.fillText("z = "+n,c+10,d+20),l=!0),g=-1*math.derivative(func,"x").eval({x:s,y:w})/math.derivative(func,"y").eval({x:s,y:w}),console.log(g),yf=(height/2-d-g*(c-width/2)/scalingFactor)/scalingFactor,e.moveTo(c,d),e.lineTo(c+10,height/2-yf*scalingFactor),plotPoint(e,c,d));e.stroke()}$("#loading").hide()},0)}else throwError("Please enter level curves to plot");else throwError("Please enter a function to plot")}var height,width,func,isGraph,scalingFactor=100;$(document).ready(function(){$(window).width()<1e3?($("#mobile-warning").show(),$("#wrapper").hide()):($("#wrapper").show(),height=$(window).height(),width=.75*$(window).width(),$("#graph-canvas")[0].width=width,$("#graph-canvas")[0].height=height),$("#graph-canvas").click(function(t){var i=convertToRectCoords(t.pageX-this.offsetLeft,t.pageY-this.offsetTop),e=math.derivative(func,"x").eval({x:i.x,y:i.y}),h=math.derivative(func,"y").eval({x:i.x,y:i.y}),o=math.derivative(math.derivative(func,"x"),"x").eval({x:i.x,y:i.y}),a=math.derivative(math.derivative(func,"y"),"y").eval({x:i.x,y:i.y}),r=math.derivative(math.derivative(func,"x"),"y").eval({x:i.x,y:i.y});$("#fx").html(e.toFixed(4)),$("#fy").html(h.toFixed(4)),$("#fxx").html(o.toFixed(4)),$("#fyy").html(a.toFixed(4)),$("#fxy").html(r.toFixed(4)),$("#partialderivatives").show()}),$("#graph-canvas").mousemove(function(t){var i=t.pageX-this.offsetLeft,e=t.pageY-this.offsetTop,h=convertToRectCoords(i,e);$("#tooltip").show(),$("#tooltip").html(h.x.toFixed(4)+", "+h.y.toFixed(4)),$("#tooltip").css({left:i+100<$(window).width()?i-.25*$(window).width()+20:i-.25*$(window).width()-120,top:e+40<$(window).height()?e+20:e-60})}),$("#graph-canvas").mouseleave(function(t){$("#tooltip").hide()}),$(window).resize(function(){$(window).width()<1e3?($("#mobile-warning").show(),$("#wrapper").hide()):($("#mobile-warning").hide(),$("#wrapper").show(),height=$(window).height(),width=.75*$(window).width(),$("#graph-canvas")[0].width=width,$("#graph-canvas")[0].height=height,isGraph&&plotLevelCurves())})});