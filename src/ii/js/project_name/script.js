document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
	// открытие/закрытие правил акции
// var toggleRules = (function() {
//	 var list = document.querySelector('.official-list'),
//	 full = list.querySelector('.full');
	
//	 return function() {
//	 if (list.classList.contains('open')) {
//		 full.slideUp(400, function() {
//		 list.classList.toggle('open');
//		 });
//	 } else {
//		 full.slideDown(400, function() {
//		 list.classList.toggle('open');
//		 });
//	 }
	
//	 }
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

	var animate = new TimelineMax({repeat: -1});
	animate.fromTo(clouds, 3, {y: 110 }, {y: 0, yoyo: true})
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
	animate.fromTo(ray, 3, {opacity: 1}, {opacity: 0.3}).to(ray, 3, {opacity: 1});


	bear.addEventListener('mouseenter', function(){
		bearAnimate.to(balalaika, 1, { y: 30, x: 0})
			.to(balalaika, 2, { y: -105, x: 30, rotation: -30, transformOrigin: 'center right' })
			.to(balalaika, 1, { y: -115, x: 30, ease:Back.easeOut })
			.to(hat, 2, { y: -90, x: -60, rotation: -30, transformOrigin: 'center right', ease:Back.easeOut }, "-=2.5")
			.to(hatLeft, 2, { y: -10, x: -30, rotation: 60, transformOrigin: 'center right', ease:Bounce.easeOut }, "-=2")
			.to(mouth, 1, {	delay: 1.5,	y: -5, x: -5,	rotation: 10, transformOrigin: 'center center' }, "-=3")
			.to(balalaika, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right' })
			.to(hat, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right', ease:Back.easeOut },"-=1.5")
			.to(hatLeft, 2, { y: 0, x: 0, rotation: 0, transformOrigin: 'center right', ease:Bounce.easeOut }, "-=1.5")
			.to(mouth, 4, { y: 0, x: 0, rotation: 0 }, "-=1");

		var eyebrowAnimate = new TweenMax([eyebrowLeft, eyebrowRight] , 0.8, {
		bezier:{
			type:"soft", 
			values:[{x:0, y:-20}, {x:0, y:0}],
			autoRotate:false
		},
		ease:Linear.easeInOut, repeat:-1});
		bearAnimate.to(nose, 0.2, { x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: 0});
	});

	bear.addEventListener('mouseleave', function(){
		balalaikaAnimate();
			
	});


	document.querySelector('.bear__nose').addEventListener('click', function(){
		animate.to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: 0});
	})
})();



//слайдер
(function movingCarousel(slide) {
	
	var slider = document.querySelector('.slider'),//слайдер
	sliderWrapper = slider.querySelector('.slide'),//контейнер слайдов
	slideItems = slider.querySelectorAll('.slide__item'),//элемент слайдера
	wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
	itemWidth = parseFloat(getComputedStyle(slideItems[0]).width), // ширина одного элемента 
	prev = slider.querySelector('.js__previous_btn'), // кнопка "назад"
	next = slider.querySelector('.js__next_btn'), // кнопка "вперед"
	positionLeftItem = 0, // позиция левого активного элемента
	transform = 0, // значение транфсофрмации контейнера слайдов
	step = itemWidth / wrapperWidth * 100; // величина шага (для трансформации)
	var dateItems = document.querySelectorAll('.date__item')
	var dolls = document.querySelectorAll('.date__img')
	var viewportStart = parseFloat(sliderWrapper.getBoundingClientRect().left);
	var viewportFinish = viewportStart + wrapperWidth;
	var visible = [];

	

	var position = {
	getMin: 0,
	getMax: slideItems.length - 1,
	};
	// текущая дата локально
    var now = new Date();

    // сдвиг на московское время
    var moscowOffset = 180 / 60;
    var offset = now.getTimezoneOffset() / 60 + moscowOffset;

    // текущее время по москве
    now.setHours(now.getHours() + offset);

    // выставляем соответствующее дате положение слайдера
    for (var i = 0; i < slideItems.length; i++) {	

    	if (now.getDate() == +slideItems[i].dataset.slide) {
    		positionLeftItem = +slideItems[i].dataset.slide - 13;
    		transform = (13 - +slideItems[i].dataset.slide) * step;
    		
    		sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    	}

    	if (now.getDate() > 13) {
			prev.classList.remove('slider__prev_disable');	
    	}
    	if (now.getDate() == 19) {
			next.classList.add('slider__prev_disable');	
    	}		
				
	}

	//показываем активную дату на календаре
	for (var i = 0; i < dateItems.length; i++) {
		
		if(now.getDate() == +dateItems[i].dataset.date){
			
			dateItems[i].dataset.state = "active"
		}

		//если есть совпадение дата-атрибутов, то показываем матрешку
		if (now.getDate() > +dateItems[i].dataset.date) {
			
			dateItems[i].dataset.state = "disable"
		}
	}

	//при нажатии на кнопку назад
	prev.addEventListener("click", function(evt) {
		evt.preventDefault();
		//если позиция крайнего левого элемента нулевая, то ничего не делать
		if (positionLeftItem <= position.getMin) {
		return;
		}
		//если кнопка вперед задизейблена, то активировать ее
		if (next.classList.contains('slider__next_disable')) {
		next.classList.remove('slider__next_disable');
		}

		//если достигли крайнего левого элемента и кнопка назад активна, то задизейблить ее
		if (!prev.classList.contains('slider__prev_disable') && positionLeftItem - 1 <= position.getMin) {
		prev.classList.add('slider__prev_disable');
		}
		positionLeftItem--;
		transform += step;
		//сдвигаем контейнер слайдера
		sliderWrapper.style.transform = 'translateX(' + transform + '%)';
		
		//вносим все эл-ты до видимого слайда в массив
		for (var i = 0; i < slideItems.length; i++) {			
			var itemStart = parseFloat(slideItems[i].getBoundingClientRect().left);

			if (itemStart < viewportFinish) {
				visible.push(slideItems[i - 1]);
			}
			
		}

		//скрываем/показываем матрешку
		isVisibleDoll()	
	});

	//при нажатии на кнопку вперед	
	next.addEventListener("click", function(evt) {
		evt.preventDefault();

		//если последний элемента слайдера, то ничего не делать
		if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
		return;
		}

		//если кнопка назад задизейблена, то активировать ее
		if (prev.classList.contains('slider__prev_disable')) {
		prev.classList.remove('slider__prev_disable');
		}

		//если достигли последнего элемента и кнопка вперед активна, то задизейблить ее
		if (!next.classList.contains('slider__next_disable') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
		next.classList.add('slider__next_disable');
		}
		positionLeftItem++;
		transform -= step;
		//сдвигаем контейнер слайдера
		sliderWrapper.style.transform = 'translateX(' + transform + '%)';

		//вносим все эл-ты до видимого слайда в массив
		for (var i = 0; i < slideItems.length; i++) {			
			var itemStart = parseFloat(slideItems[i].getBoundingClientRect().left);

			if (itemStart < viewportFinish) {
				visible.push(slideItems[i + 1]);
			}
			
		}

		//скрываем/показываем матрешку
		isVisibleDoll();	
		
	});

	//скрыть/показать матрешку
	var isVisibleDoll = function(){
		//получаем значение дата-атрибута последнего слайда в массиве(вимимый слайд)
		var visibleSlide = visible[visible.length - 1].dataset.slide

		for (var i = 0; i < dateItems.length; i++) {
			//если матрешка видна, то скрываем ее
			if(dateItems[i].dataset.state == "active" || dolls[i].dataset.doll == "visible"){
				
				dolls[i].dataset.doll = "unvisible"
			}

			//если есть совпадение дата-атрибутов, то показываем матрешку
			if (visibleSlide === dateItems[i].dataset.date) {
				
				dolls[i].dataset.doll = "visible"
			}
		}
	}

})();


// //клик на карту
// 	$('.region').click(function() {

// 		var region = $(this).data('region');
// 		console.log(region);
//	 //выборка по соответствию data-region в map с data-date в slider
// 		$('.lucky-friday__slider:not([data-date~=' + region + '])').removeClass('active');
// 		$('.lucky-friday__slider[data-date~=' + region + ']').addClass('active');
//	 	//выборка по соответствию data-region в map с data-date в slider
// 		$('.date:not([data-date~=' + region + '])').removeClass('active');
// 		$('.date[data-date~=' + region + ']').addClass('active');

// 		$('.marker:not([data-marker~=' + region + '])').removeClass('active');
// 		$('.marker[data-marker~=' + region + ']').addClass('active');

// 		$('.marker-full_30').css('display', 'none');
// 		$('.marker-full_14').css('display', 'none');
// 		$('.region').removeClass('full');
// 		$('.marker').css('display', 'block');

// 		$('.region').removeClass('active');
// 		$('.marker[data-marker~=' + region + ']').css('fill-opacity', '1');
// 		$(this).addClass('active');
// 	});

// 	//клик на календарь
// 	$('.date').click(function(){
// 		$('.lucky-friday__slider').removeClass('active');
// 		$(this).addClass('active');
// 		var date = $(this).data('date');

// 		if (date == 14){
// 			$('.region').addClass('full');
// 			$('.marker').css('display', 'none');
// 			$('.marker-full_30').css('display', 'none');
// 			$('.marker-full_14').css('display', 'block');
// 			$('.date').removeClass('active');
// 			$(this).addClass('active');
// 		} else if (date == 30){
// 			$('.region').addClass('full');
// 			$('.marker').css('display', 'none');
// 			$('.marker-full_14').css('display', 'none');
// 			$('.marker-full_30').css('display', 'block');
// 			$('.date').removeClass('active');
// 			$(this).addClass('active');
// 		} else {
// 			$('.region').removeClass('full');
// 			$('.region:not([data-region~=' + date + '])').removeClass('active');
// 			$('.region[data-region~=' + date + ']').addClass('active');

// 			$('.marker').css('display', 'block');
// 			$('.marker:not([data-marker~=' + date + '])').removeClass('active');
// 			$('.marker[data-marker~=' + date + ']').addClass('active');
// 			$('.marker-full_30').css('display', 'none');
// 			$('.marker-full_14').css('display', 'none');

// 			$('.marker').css('display', 'block');
// 			$('.date').removeClass('active');
// 			$(this).addClass('active');
// 		}

// 	});

// 	//клик на маркер
// 	$('.marker').click(function(){
// 		console.log($(this).data('marker'));
// 		var marker = $(this).data('marker');
//	 	//выборка по соответствию data-marker в map с data-date в slider
// 		$('.date:not([data-date~=' + marker + '])').removeClass('active');
// 		$('.date[data-date~=' + marker + ']').addClass('active');

// 		$('.region:not([data-region~=' + marker + '])').removeClass('active');
// 		$('.region[data-region~=' + marker + ']').addClass('active');

// 		$('.marker').removeClass('active');
// 		$(this).addClass('active');
// 	});

});