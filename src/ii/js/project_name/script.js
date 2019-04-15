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


//анимация первого экрана

var animateScreen = (function(){

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

	var cloudsAnimate = new TimelineMax({repeat: -1});
	cloudsAnimate.fromTo(clouds, 3, {y: 110 }, {y: 0, yoyo: true})
	  .to(clouds, 3, {opacity: 0.5})
	  .to(clouds, 1, {opacity: 1})
	  .to(clouds, 10, {x: -1200, y: 190, ease:Linear.easeOut}, "+=1")
	  .to(clouds, 30, {
	    bezier:{
	      type:"soft", 
	      values:[{x: -1200, y: 190},
	              {x: -200, y: -190},
	              {x: 190, y: 110},
	              {x: 1800, y: -150}],
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
	        .to(hat, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right', ease:Back.easeOut },"-=1.5")
	        .to(hatLeft, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right', ease:Bounce.easeOut })
	        .to(mouth, 4, { y: 0, x: 0, rotation: 0 }, "-=1");

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
		balalaikaAnimate();
	  
	});
})();


(function movingCarousel(slide) {
    var width = 806;
    var slider = document.querySelector('.slider');
    var slide = slider.querySelector('.slide');
    var slideItem = slider.querySelectorAll('.slide__item');
    var position = 0;

    slider.querySelector('.js__previous_btn').addEventListener("click", function(evt) {
        evt.preventDefault();
        position = Math.min(position + width, 0);
        slider.style.marginLeft = position + 'px';
    });

    slider.querySelector('.js__next_btn').addEventListener("click", function(evt) {
    	console.log('click');
        evt.preventDefault();
        position = Math.max(position - width, -width * (slide.length - 1));
        slider.style.marginLeft = position + 'px';
    });
})();


});