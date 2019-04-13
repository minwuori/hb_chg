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

var parallax = (function() {
  var screen = document.querySelector('.greeting');
  var svg = screen.querySelector('.scene');

  var $three = Array.prototype.slice.call(svg.querySelectorAll('[data-parallax]'));

  var start, position, dir, diff, 
  limit = 10, 
  speed = 0.0003,
  factor = 1.0001;

  var move = function(e) {
    if (!start && start !== 0) {
      // еще движений не было
      // старт с позиции курсора
      start = position = e.clientX;
      diff = 0; // исходный сдвиг
      return;
    }
    // направление движения
    var ratio = e.clientX - position > 0 ? 1 : -1;
    
    // если еще не было движения
    // устанавливаем исходное направление
    if (!dir) dir = ratio;

    if (ratio !== dir) { // начал двигаться в другом направлении
      // сбрасываем стартовую позицию
      start = position;
      // меняем направление
      dir = ratio;
      // сдвигаем в другую сторону
    } 

    // устанавливаем новую текущую позицию
    position = e.clientX;

    // расстояние сдвига курсора
    var dist = e.clientX - start;
    // рассчитываем сдвиг фона
    // сдвиг курсора * скорость движения
    var newDiff = dist * speed;
    diff = diff + newDiff;
    // проверяем пределы сдвига
    if (Math.abs(diff) > limit) diff = diff > 0 ? limit : -1 * limit;

    // сдвигаем все слои
    $three.forEach(function(el) {
      el.style.transform = 'translateX(' + (el.dataset.parallax * factor * diff) + 'px)';
    })
  };

  var reset = function() {
    start = null;
    position = null;
    $three.forEach(function(el) {
      el.style.transform = 'translateX(0px)';
    })
  };

  screen.parentElement.addEventListener('mousemove', move)
  screen.parentElement.addEventListener('mouseleave', reset)
})();

//анимация медведя

var bear = document.querySelector('.bear'),
    balalaika = bear.querySelector('.bear__balalaika'),
    hat = bear.querySelector('.bear__hat'),
    hatLeft = bear.querySelector('.bear__left'),
    mouth = bear.querySelector('.bear__mouth'),
    eyebrow = bear.querySelector('.bear__eyebrows'),
    eyebrowLeft = bear.querySelector('.bear__eyebrow1'),
    eyebrowRight = bear.querySelector('.bear__eyebrow2'),
    nose = bear.querySelector('.bear__nose'),
    ray = document.querySelector('.ray'),
    clouds = document.querySelector('.clouds'),
    bearAnimate = new TimelineMax({});

function balalaikaAnimate(){
  var bezierBalalaika = new TweenMax(balalaika , 4, {
    bezier:{
      type:"soft", 
      values:[{x:0, y: 0}, 
              {x:-10, y:-10}, 
              {x: 0, y: -20}, 
              {x: 0, y: 30}, 
              {x: 10, y: 10},
              {x: 0, y: 0}],
    },
  //rotation: 45, 
  ease:Linear.easeInOut, repeat: -1});
};
balalaikaAnimate();


  // var clouds = new TweenMax('.clouds' , 10, {
  //   bezier:{
  //     type:"thru", 
  //     values:[{left:110, top: 270},
  //             {left: 0, top: 100},
  //             {left: 100, top: 110},
  //             {left: 270, top: 160},
  //             {left: 0, top: 110}],
  //   },
  // //rotation: 45, 
  // ease:Linear.easeNone, repeat: -1});

  // var clouds = new TweenMax('.clouds' , 20, {
  //   bezier:{
  //     type:"soft", 
  //     values:[{left: 100, top: 110},
  //             {left: -3800, top: 350},
  //             {left: 100, top: 110},
  //             {left: 600, top: 130},
  //             {left: 2000, top: 300}],
  //   },
  // opacity: 0.9, 
  // ease:Linear.ease, repeat: -1});


var cloudsAnimate = new TimelineMax({repeat: -1});
cloudsAnimate.fromTo(clouds, 3, {y: 110 }, {y: 0, yoyo: true})
  .to(clouds, 3, {opacity: 0.5})
  .to(clouds, 1, {opacity: 1})
  .to(clouds, 6, {x: -1200, y: 190, ease:Linear.easeOut}, "+=1")
  .to(clouds, 15, {
    bezier:{
      type:"soft", 
      values:[{x: -1200, y: 190},
              {x: -200, y: -190},
              {x: 190, y: 110},
              {x: 1800, y: -110}],
    },
    ease:Linear.easeIn,
    opacity: 0.6
});
var rayAnimate = new TimelineMax({repeat: -1});
rayAnimate.fromTo(ray, 3, {opacity: 1}, {opacity: 0.3}).to(ray, 3, {opacity: 1});


bear.addEventListener('mouseenter', function(){
  bearAnimate.to(balalaika, 1, { y: 30, x: 0})
        .to(balalaika, 2, { y: -105, x: 30, rotation: -30, transformOrigin: 'center right' })
        .to(balalaika, 1, { y: -115, x: 30, ease:Back.easeOut })
        .to(hat, 2, { y: -90, x: -60, rotation: -30, transformOrigin: 'center right', ease:Back.easeOut }, "-=2.5")
        .to(hatLeft, 2, { y: -10, x: -30, rotation: 60, transformOrigin: 'center right', ease:Bounce.easeOut }, "-=1.5")
        .to(mouth, 1, {  delay: 1.5,  y: -5, x: -5,  rotation: 10, transformOrigin: 'center center' }, "-=3")
        .to(balalaika, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right' })
        .to(hat, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right', ease:Back.easeOut },"-=1.5");

  var eyebrowAnimate = new TweenMax([eyebrowLeft, eyebrowRight] , 0.8, {
    bezier:{
      type:"soft", 
      values:[{x:0, y:-20}, {x:0, y:0}],
      autoRotate:false
    },
  ease:Linear.easeInOut, repeat:-1});
  bearAnimate.to(nose, 0.2, {delay: 0.8, x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: 0});
});

bear.addEventListener('mouseleave', function(){

  TweenMax.to(mouth, 4, { dalay: 0.5, y: 0, x: 0, rotation: 0 });
  balalaikaAnimate();
  
});


});