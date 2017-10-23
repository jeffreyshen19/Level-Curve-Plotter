function plotLine(t,e,i,h,o){t.moveTo(e,i),t.lineTo(h,o),t.stroke()}function plotPoint(t,e,i){t.fillRect(e,i,2,2)}function throwError(t){$("#error").html(t)}function convertToRectCoords(t,e){return mouseX=t-.25*$(window).width()-width/2,mouseY=height/2-e,{x:mouseX/=scalingFactor,y:mouseY/=scalingFactor}}function generateHex(){return"#"+function t(e){return(e+=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"][Math.floor(16*Math.random())])&&6==e.length?e:t(e)}("")}function sign(t){return t<=0?0:t>0?1:void 0}function zoomIn(){scalingFactor*=10,plotLevelCurves()}function zoomOut(){scalingFactor/=10,plotLevelCurves()}function plotLevelCurves(){$("#error").html(""),$("#partialderivatives").hide(),$("#graph").show(),isGraph=!0,func=$("#function").val();var t=math.parse(func);try{t.eval({x:0,y:0})}catch(t){return void throwError("Please enter a valid function")}if(0!=$("#function").val().length)if(0!=$("#levelcurves").val().length){var e=document.getElementById("graph-canvas"),i=e.getContext("2d");i.font="20px crimsontext",i.fillStyle="#000000",i.strokeStyle="#000000",i.clearRect(0,0,e.width,e.height),$("#loading").show(),setTimeout(function(){i.beginPath(),plotLine(i,0,height/2,width,height/2),i.fillText("x",width-20,height/2+20),plotLine(i,width/2,0,width/2,height),i.fillText("y",width/2+15,20);var e,h;if(width/2/scalingFactor<1){for(var o=(""+width/2/scalingFactor).split(".")[1],a=0;a<o.length;a++)if("0"!==o.charAt(a)){e=Math.pow(10,-a-1);break}}else e=(""+Math.trunc(width/2/scalingFactor)).length;if(height/2/scalingFactor<1){for(var o=(""+height/2/scalingFactor).split(".")[1],a=0;a<o.length;a++)if("0"!==o.charAt(a)){h=Math.pow(10,-a-1);break}}else h=(""+Math.trunc(height/2/scalingFactor)).length;for(a=0;a<width/2;a+=scalingFactor*e)plotLine(i,width/2+a,height/2-10,width/2+a,height/2+10),plotLine(i,width/2-a,height/2-10,width/2-a,height/2+10);for(var n=0;n<width/2;n+=scalingFactor*e)plotLine(i,width/2-10,height/2+n,width/2+10,height/2+n),plotLine(i,width/2-10,height/2-n,width/2+10,height/2-n);i.closePath(),i.fillText(""+e,width/2+scalingFactor*e-5,height/2+30),i.fillText(""+h,width/2+10,height/2-scalingFactor*h+5);var r,l,c,s;i.font="14px crimsontext";for(var d=$("#levelcurves").val().split(","),w=0;w<d.length;w++)for(r=d[w],i.fillStyle=generateHex(),i.strokeStyle=i.fillStyle,l=!1,c=0;c<=width;c+=scalingFactor/50)for(s=0;s<=height;s+=scalingFactor/50)value=t.eval({x:(c-width/2)/scalingFactor,y:(height/2-s)/scalingFactor}),Math.abs(value-r)<=.01&&(l||(i.fillText("z = "+r,c+10,s+20),l=!0),plotPoint(i,c,s));$("#loading").hide()},0)}else throwError("Please enter level curves to plot");else throwError("Please enter a function to plot")}var height,width,func,isGraph,scalingFactor=100;$(document).ready(function(){$(window).width()<1e3?($("#mobile-warning").show(),$("#wrapper").hide()):($("#wrapper").show(),height=$(window).height(),width=.75*$(window).width(),$("#graph-canvas")[0].width=width,$("#graph-canvas")[0].height=height),$("#graph-canvas").click(function(t){var e=convertToRectCoords(t.pageX-this.offsetLeft,t.pageY-this.offsetTop),i=math.derivative(func,"x").eval({x:e.x,y:e.y}),h=math.derivative(func,"y").eval({x:e.x,y:e.y}),o=math.derivative(math.derivative(func,"x"),"x").eval({x:e.x,y:e.y}),a=math.derivative(math.derivative(func,"y"),"y").eval({x:e.x,y:e.y}),n=math.derivative(math.derivative(func,"x"),"y").eval({x:e.x,y:e.y});$("#fx").html(i),$("#fy").html(h),$("#fxx").html(o),$("#fyy").html(a),$("#fxy").html(n),$("#partialderivatives").show()}),$("#graph-canvas").mousemove(function(t){var e=t.pageX-this.offsetLeft,i=t.pageY-this.offsetTop,h=convertToRectCoords(e,i);$("#tooltip").show(),$("#tooltip").html(h.x.toFixed(4)+", "+h.y.toFixed(4)),$("#tooltip").css({left:e+100<$(window).width()?e-.25*$(window).width()+20:e-.25*$(window).width()-120,top:i+40<$(window).height()?i+20:i-60})}),$("#graph-canvas").mouseleave(function(t){$("#tooltip").hide()}),$(window).resize(function(){$(window).width()<1e3?($("#mobile-warning").show(),$("#wrapper").hide()):($("#mobile-warning").hide(),$("#wrapper").show(),height=$(window).height(),width=.75*$(window).width(),$("#graph-canvas")[0].width=width,$("#graph-canvas")[0].height=height,isGraph&&plotLevelCurves())})});