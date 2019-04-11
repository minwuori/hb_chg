document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
  // открытие/закрытие правил акции
// var toggleRules = (function() {
//   var list = document.querySelector('.official-list'),
//   full = list.querySelector('.full');
  
//   return function() {
//     if (list.classList.contains('open')) {
//       full.slideUp(400, function() {
//         list.classList.toggle('open');
//       });
//     } else {
//       full.slideDown(400, function() {
//         list.classList.toggle('open');
//       });
//     }
    
//   }
// })();

//анимация балалайки

var balalaika = document.querySelector('.balalaika');
balalaika.addEventListener('mouseenter', function(){
  TweenMax.to(".balalaika", 2, {
    bezier:{
      type:"soft", 
      values:[{setX:150, setY:300}, {setX:300, setY:-10}, {setX:500 + Math.random() *100, setY:320*Math.random() + 50}, {setX:650, setY:320*Math.random() + 50}, {setX:900, setY:-80}], 
      //autoRotate needs to know how to adjust x/y/rotation so we pass in the names of the apporpriate KineticJS methods
autoRotate:["setX","setY","setRotationDeg"]
    }, 
    ease:Linear.easeNone, autoCSS:false
  });
})

var appHeight = 400,
    appWidth = 840,
    appCenterX = appWidth/2,
    appCenterY = appHeight/2,
    stage = new Kinetic.Stage({
       container: 'container',
       width: appWidth,
       height:appHeight
     }),
    layer = new Kinetic.Layer(),
    bugFile = new Image(),
    tl;

stage.add(layer);
bugFile.src = "https://www.greensock.com/_img/codepen/bezierCreature/creature.png";

function getAnimation() {
  var creature = new Kinetic.Image({
    image: bugFile,
    width:27,
    height:29,
    x:-50
  });

  //bezier magic provided by GSAP BezierPlugin (included with TweenMax)
  //https://api.greensock.com/js/com/greensock/plugins/BezierPlugin.html
  var bezTween = new TweenMax(creature, 6, {
    bezier:{
      type:"soft", 
      values:[{setX:150, setY:300}, {setX:300, setY:-10}, {setX:500 + Math.random() *100, setY:320*Math.random() + 50}, {setX:650, setY:320*Math.random() + 50}, {setX:900, setY:-80}], 
      //autoRotate needs to know how to adjust x/y/rotation so we pass in the names of the apporpriate KineticJS methods
autoRotate:["setX","setY","setRotationDeg"]
    }, 
    ease:Linear.easeNone, autoCSS:false});
  
  layer.add(creature); 
  
  return bezTween;
  
}

 function buildTimeline() {
  tl = new TimelineMax({repeat:4, onUpdate:updateSlider, delay:1});
  for (i = 0 ; i< 30; i++){
    //start creature animation every 0.12 seconds
  tl.add(getAnimation(), i * 0.17);
  }
} 

});