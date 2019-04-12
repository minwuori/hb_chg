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

// var parallax = (function() {
//   var screen = document.querySelector('.greeting');
//   var svg = screen.querySelector('.bg');

//   var $els = Array.prototype.slice.call(svg.querySelectorAll('[data-parallax]'));

//   var start, position, dir, diff, 
//   limit = 10, 
//   speed = 0.0003,
//   factor = 1.0001;

//   var move = function(e) {
//     if (!start && start !== 0) {
//       // еще движений не было
//       // старт с позиции курсора
//       start = position = e.clientX;
//       diff = 0; // исходный сдвиг
//       return;
//     }
//     // направление движения
//     var ratio = e.clientX - position > 0 ? 1 : -1;
    
//     // если еще не было движения
//     // устанавливаем исходное направление
//     if (!dir) dir = ratio;

//     if (ratio !== dir) { // начал двигаться в другом направлении
//       // сбрасываем стартовую позицию
//       start = position;
//       // меняем направление
//       dir = ratio;
//       // сдвигаем в другую сторону
//     } 

//     // устанавливаем новую текущую позицию
//     position = e.clientX;

//     // расстояние сдвига курсора
//     var dist = e.clientX - start;
//     // рассчитываем сдвиг фона
//     // сдвиг курсора * скорость движения
//     var newDiff = dist * speed;
//     diff = diff + newDiff;
//     // проверяем пределы сдвига
//     if (Math.abs(diff) > limit) diff = diff > 0 ? limit : -1 * limit;

//     // сдвигаем все слои
//     $els.forEach(function(el) {
//       el.style.transform = 'translateX(' + (el.dataset.parallax * factor * diff) + 'px)';
//     })
//   };

//   var reset = function() {
//     start = null;
//     position = null;
//     $els.forEach(function(el) {
//       el.style.transform = 'translateX(0px)';
//     })
//   };

//   screen.parentElement.addEventListener('mousemove', move)
//   screen.parentElement.addEventListener('mouseleave', reset)
// })();

//анимация медведя

var bear = document.querySelector('.bear'),
    balalaika = bear.querySelector('.bear__balalaika'),
    hat = bear.querySelector('.bear__hat'),
    mouth = bear.querySelector('.bear__mouth'),
    eyebrowLeft = bear.querySelector('.bear__eyebrow1'),
    eyebrowRight = bear.querySelector('.bear__eyebrow2'),
    nose = bear.querySelector('.bear__nose');


  var bezierBalalaika = new TweenMax(balalaika , 4, {
    bezier:{
      type:"soft", 
      values:[{x:10, y: 0}, {x:-10, y:0}, {x: 0, y: -20}, {x: 0, y: 40}, {x: 0, y: 0}],
      autoRotate: false,
    },
  //rotation: 45, 
  ease:Linear.easeInOut, repeat: -1});



bear.addEventListener('mouseenter', function(){
  TweenMax.to(balalaika, 2, {
    y: 50,
    rotation: 60,
    transformOrigin: 'center right',
    x: -130,
    ease:Back.easeOut
  });
  

  TweenMax.to(mouth, 2, {
    delay: 1,
    y: -5,
    x: -5,
    rotation: 10,
    transformOrigin: 'center center'
  });

  var bezierEyebrow = new TweenMax([eyebrowLeft, eyebrowRight] , 0.8, {
    bezier:{
      type:"soft", 
      values:[{x:0, y:-20}, {x:0, y:0}],
      autoRotate:false
    },
  ease:Linear.easeInOut, repeat:5});
})
bear.addEventListener('mouseleave', function(){
  TweenMax.to(balalaika, 1, {
    y: 0,
    rotation: 0,
    transformOrigin: 'center right',
    x: 0
  });

  TweenMax.to(mouth, 4, {
    dalay: 0.5,
    y: 0,
    x: 0,
    rotation: 0
  });
})


});