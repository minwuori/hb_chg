document.addEventListener('DOMContentLoaded', function(){ 

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
		doll = document.querySelector('.doll'),
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

	TweenMax.fromTo(doll, 2, {x: -30, y: 150, opacity: 0},{ x: 0, y: 0, opacity: 1, ease: Bounce.easeOut});

	doll.addEventListener('click', function(){
	var dollAnimate= new TweenMax( doll, .5, {			
		// bezier:{
		// 	type:"soft",
		// 	values:[{x:0, y: 0}, {x: 150, y: 150},{x:-100, y: 300}, {x:-500, y:50}, {x:0, y:0}],
		// 	autoRotate: 15
		// },
		// ease: Expo.easeOut,
		 });

	var dollAnima = new TimelineMax({});

		dollAnima.to(doll, .5, { x: 120, y: 150, rotation: 90,ease: Power4.easeIn})
			.to(doll, 2, { rotation: 90, x: -80, y: 200, ease: Power4.easeIn})
			.to(doll, 1, { x: 0, y: 0,transformOrigin: 'center center', rotation: 15,	ease: Bounce.easeOut})
	});

	var eyebrowAnimate = new TweenMax([eyebrowLeft, eyebrowRight] , 0.8, {
		bezier:{
			type:"soft", 
			values:[{x:0, y:-20}, {x:0, y:0}],
			autoRotate:false
		},
		ease:Linear.easeInOut, repeat:-1});
	bear.addEventListener('click', function(){
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

		
		bearAnimate.to(nose, 0.2, { x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: 0});
	});

	bear.addEventListener('mouseleave', function(){
		balalaikaAnimate();
			
	});


	document.querySelector('.bear__nose').addEventListener('click', function(){
		animate.to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: -3}).to(nose, 0.2, {x: 3}).to(nose, 0.2, {x: 0});
	});
})();



//слайдер
var sliderCalendar = (function movingCarousel(slide) {
	
	var slider = document.querySelector('.slider'), // слайдер
	sliderWrapper = slider.querySelector('.slide'), // контейнер слайдов
	slideItems = slider.querySelectorAll('.slide__item'),  // элемент слайдера
	wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), // ширина обёртки
	itemWidth = parseFloat(getComputedStyle(slideItems[0]).width), // ширина одного элемента 
	prev = slider.querySelector('.js__previous_btn'), // кнопка "назад"
	next = slider.querySelector('.js__next_btn'), // кнопка "вперед"
	positionLeftItem = 0, // позиция левого активного элемента
	transform = 0, // значение транфсофрмации контейнера слайдов
	step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
	dateItems = document.querySelectorAll('.date__item'), // эл-ты с датами
	dolls = document.querySelectorAll('.date__img'), // матрешки
	viewportStart = parseInt(sliderWrapper.getBoundingClientRect().left), //координата X начала вьюпорта 
	viewportFinish = viewportStart + wrapperWidth, //конецц вьюпорта
	visible = []; // массив со слайдами до видимого слайда включительно

	

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
		if (now.getMonth() == 4) {
			if (now.getDate() == +slideItems[i].dataset.slide) {
				positionLeftItem = +slideItems[i].dataset.slide - 13;
				transform = (13 - +slideItems[i].dataset.slide) * step;
				
				sliderWrapper.style.transform = 'translateX(' + transform + '%)';
			}

			if (now.getDate() > 13 && now.getDate() < 19) {
			prev.dataset.sliderPrev = "";	
			}
			if (now.getDate() == 19) {
			next.dataset.sliderNext = "disable";
			prev.dataset.sliderPrev = "";	

			}
		}		
				
	}


	//показываем активную дату на календаре
	for (var i = 0; i < dateItems.length; i++) {
		if (now.getMonth() == 4) {
	    	//если есть совпадение дата-атрибутов, то выделяем эту дату
			if(now.getDate() == +dateItems[i].dataset.date){
				
				dateItems[i].dataset.state = "active"
			}

			if (now.getDate() > +dateItems[i].dataset.date) {
				
				dateItems[i].dataset.state = "disable"
			}
		}
	}

	for (var i = 0; i < dolls.length; i++) {
		if (now.getMonth() == 4) {
		
			if(now.getDate() == +dolls[i].dataset.doll){
				
				dolls[i].dataset.dollState = "visible"
			}

			//если есть совпадение дата-атрибутов, то показываем матрешку
			if (now.getDate() > +dolls[i].dataset.doll && now.getDate() <= 19) {
				
				dolls[i].dataset.dollState = "unvisible"
			}
		}
	}

	// перебираем эл-ты дат
	dateItems.forEach(function(dateItem){
		// навешиваем событие на дату
		dateItem.addEventListener('click', function(){

			// перебираем слайды 
			slideItems.forEach(function(slideItem) {
				// если дата-атрибуты совпали, то передвинуть на соответствующий слайд
				if ( dateItem.dataset.date == slideItem.dataset.slide) {
					positionLeftItem = +slideItem.dataset.slide - 13;
					transform = (13 - +slideItem.dataset.slide) * step;
					sliderWrapper.style.transform = 'translateX(' + transform + '%)';
				
				}
			});

			// перебираем матрешки
			dolls.forEach(function(doll) {
				// если дата-атрибуты совпали, то показываем соотвутствующую матрешку
				if ( dateItem.dataset.date == doll.dataset.doll) {
					doll.dataset.dollState = "visible"
				} else {
					doll.dataset.dollState = "unvisible"
				}
			});


			// если это первый элемент с датой, то задизейблить кнопку назад
			if (dateItem.dataset.date == 13 ) {
				prev.dataset.sliderPrev = "disable";	
			
			// если последний, то задизейблить кнопку вперед
			} else if (+dateItem.dataset.date == 19) {
				next.dataset.sliderNext = "disable";
				prev.dataset.sliderPrev = "";	

			// иначе обе кнопки активировать
			} else {
				prev.dataset.sliderPrev = "";	
				next.dataset.sliderNext = "";

			}
			
		});


	});

	//при нажатии на кнопку назад
	prev.addEventListener("click", function(evt) {
		evt.preventDefault();
		//если позиция крайнего левого элемента нулевая, то ничего не делать
		if (positionLeftItem <= position.getMin) {
			return;
		}
		//если кнопка вперед задизейблена, то активировать ее
		if (next.dataset.sliderNext == "disable") {
			next.dataset.sliderNext = "";
		}

		//если достигли крайнего левого элемента и кнопка назад активна, то задизейблить ее
		if (prev.dataset.sliderPrev == "" && positionLeftItem - 1 <= position.getMin) {
			prev.dataset.sliderPrev = "disable";
		}
		positionLeftItem--;
		transform += step;
		//сдвигаем контейнер слайдера
		sliderWrapper.style.transform = 'translateX(' + transform + '%)';
		
		//вносим все эл-ты до видимого слайда в массив
		for (var i = 0; i < slideItems.length; i++) {			
			var itemStart = parseInt(slideItems[i].getBoundingClientRect().left);

			if (itemStart < viewportFinish) {
				visible.push(slideItems[i - 1]);
			}
		}

		//скрываем/показываем матрешку
		isVisibleDoll();
	});

	//при нажатии на кнопку вперед	
	next.addEventListener("click", function(evt) {
		evt.preventDefault();

		//если последний элемента слайдера, то ничего не делать
		if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
		return;
		}

		//если кнопка назад задизейблена, то активировать ее
		if (prev.dataset.sliderPrev == "disable") {
		prev.dataset.sliderPrev = "";
		}

		//если достигли последнего элемента и кнопка вперед активна, то задизейблить ее
		if (next.dataset.sliderNext == "" && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
		next.dataset.sliderNext = "disable";
		}
		positionLeftItem++;
		transform -= step;
		//сдвигаем контейнер слайдера
		sliderWrapper.style.transform = 'translateX(' + transform + '%)';

		//вносим все эл-ты до видимого слайда в массив
		for (var i = 0; i < slideItems.length; i++) {			
			var itemStart = parseInt(slideItems[i].getBoundingClientRect().left);

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
			if(dateItems[i].dataset.state == "active" || dolls[i].dataset.dollState == "visible"){
				
				dolls[i].dataset.dollState = "unvisible"
			}

			//если есть совпадение дата-атрибутов, то показываем матрешку
			if (visibleSlide === dolls[i].dataset.doll) {
				
				dolls[i].dataset.dollState = "visible"
			}
		}
	}

})();

// фиксация аватарки медведя внутри экрана с игрой
var avatarFix = (function() {
	window.onscroll = function() {
		var scroll = window.pageYOffset || document.documentElement.scrollTop, // определяем положение ползунка
			screen = document.querySelector('.game'), // поле для фиксируемого элемента
			avatar = document.querySelector('.js__avatar'), //фиксируемый элемент
			posY = screen.getBoundingClientRect().top + scroll, // получаем координату верхней границы окна для фиксируемого элемента
			screenHeight = screen.offsetHeight - 100, // высота экрана
			avatarHeight = avatar.offsetHeight, // высота фиксируемого элемента
			stop = screenHeight + document.querySelector('.calendar').getBoundingClientRect().top - avatarHeight*2; // нижняя граница для фиксируемого элемента

		//если позиция скролла достигла экрана с игрой, то фиксируем аватарку
		if( scroll > (screen.getBoundingClientRect().top - avatarHeight)) {
			avatar.dataset.avatarPosition = "fixed";
		
		//если позиция скролла 	меньше, то возвращаем к исходному(абсолют кверху)
		} else {
			avatar.dataset.avatarPosition = "";
		}
		
		//если позиция скролла достигла низа экрана, то позиционируем аватарку абсолютом книзу
		if (scroll >= stop) {
			avatar.dataset.avatarPosition = "absolute";
		
		} 
	}
})();

// попап с правилами игр
var popUp = (function(){
	var	screen = document.querySelector('.game'),
		avatar = screen.querySelector('.js__avatar'),
		avatarClone = screen.querySelector('.js__avatar_clone'),
		close = screen.querySelector('.js__close'),
		mask = screen.querySelector('.js__mask'),
		popup = screen.querySelector('.pop-up'), 
		ancors = screen.querySelectorAll('.js__ancor'),
		rules = document.querySelector('#rules'),
		events = [avatar, close, mask, avatarClone];

	function checkPopup(){
				
		// скрыть/показать полосу прокрутки
		document.body.style.overflow == "hidden" ? document.body.style.overflow = "visible" : document.body.style.overflow = "hidden";
		
		//если попапа нет, то показываем его
		if (screen.dataset.popupRules == "") {
			screen.dataset.popupRules = "visible"
			//анимация появления попапа
			var maskWidth = mask.offsetWidth;
			TweenMax.fromTo(mask, .5, {x: -maskWidth}, {x: 0, ease: Cubic.easeOut});

			//анимация появления попапа
			var popupWidth = popup.offsetWidth;
			TweenMax.fromTo(popup, .5, {x: popupWidth}, {x: 0, ease: Cubic.easeOut}, "-1");

		// иначе скрываем	
		} else {
			//анимация скрытия попапа
			var maskWidth = mask.offsetWidth;
			TweenMax.fromTo(mask, .5, {x: 0}, {x: -maskWidth, ease: Cubic.easeOut});

			//анимация скрытия попапа
			var popupWidth = popup.offsetWidth;
			TweenMax.fromTo(popup, .5, {x: 0}, {x: popupWidth, ease: Cubic.easeOut}, "-1");

			// задерживаем скрытие попапа на время анимации
			setTimeout( function(){

				screen.dataset.popupRules = "";

			}, 300)
		}
	};

	//навешиваем события на все эл-ты
	events.forEach(function(item) {
		item.addEventListener('click', function(){
			checkPopup();
		})
	})

	ancors.forEach(function(ancor) {
		// для плавного перехода к полным правилам с попапа, якорю присваиваем обработчик события
		ancor.addEventListener('click', function(e) {

			// устанавливаем время анимации и количество кадров
			var animationTime = 1000,
				framesCount = 20;

			// скрываем попап и маску
			//анимация скрытия попапа
			var maskWidth = mask.offsetWidth;
			TweenMax.fromTo(mask, .5, {x: 0}, {x: -maskWidth, ease: Cubic.easeOut});

			//анимация скрытия попапа
			var popupWidth = popup.offsetWidth;
			TweenMax.fromTo(popup, .5, {x: 0}, {x: popupWidth, ease: Cubic.easeOut}, "-1");
			// показать полосу прокрутки
			if (document.body.style.overflow == "hidden") document.body.style.overflow = "visible"

			// задерживаем скрытие попапа на время анимации
			setTimeout( function(){
			
				screen.dataset.popupRules = "";

			}, 300)

			// убираем стандартное поведение
			e.preventDefault();

			//определяем положение скролла
			var scroll = window.pageYOffset || document.documentElement.scrollTop
			
			// определяем координату Y до элемента соответствующему якорю
			var coordY = rules.getBoundingClientRect().top + scroll;
			
			// запускаем интервал, в котором
			var scroller = setInterval(function() {
				// считаем на сколько скроллить за 1 такт
				var scrollBy = coordY / framesCount;
				
				// если к-во пикселей для скролла за 1 такт больше расстояния до элемента
				// и дно страницы не достигнуто
				if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
					// то скроллим на к-во пикселей, которое соответствует одному такту
					window.scrollBy(0, scrollBy);
				} else {
					// иначе добираемся до элемента и выходим из интервала
					window.scrollTo(0, coordY);
					clearInterval(scroller);
				}
			// время интервала равняется частному от времени анимации и к-ва кадров
			}, animationTime / framesCount);
		});
	})
	
		
})();


// взаимодействие с картой
var mapSvg = (function(){

	var regions = document.querySelectorAll('.js__region'), // получаем массив регионов
		hints = document.querySelectorAll('.hint'); // получаем массив подсказок

	// перебираем все регионы
	regions.forEach(function(region) {

		// навешиваем событие
		region.addEventListener('click', function(){

			// перебираем все подсказки
			hints.forEach(function(hint) {

				// если соответствует данному региону
				if (hint.dataset.hint == region.dataset.regionEvent) {

					// и подсказка скрыта то показываем ее
					if (getComputedStyle(hint).display == "none") {
						hint.style.display = "block";

						//добавляем анимацию появления кодсказки
						TweenMax.fromTo(hint, 1, {y: 20}, {y: 0, ease:Bounce.easeOut})
					
					// иначе скрываем (при повторном клике)
					} else {
						hint.style.display = "none";

					}

				// если не соответствует, то скрываем все подсказки 
				} else {
					hint.style.display = "none";
				}
			});

		})
	});


})();

var btn = (function(){
	var btnParticipate = document.querySelector('.js__btn_participate'),
		btnStart = document.querySelector('.js__btn_start'),
		screen = document.querySelector('main'),
		screenGame = document.querySelector('.game'),
		gameContent = screenGame.querySelector('.game__content'),
		answersPairs = gameContent.querySelector('.answers-pairs'),
		gameContentWidth = gameContent.offsetWidth,
		gameContentHeight = gameContent.offsetHeigth,
		statistic = gameContent.querySelector('.message');

	// при клике на кнопку "Начать игру"
	btnParticipate.addEventListener('click', function(){
		// если сегодня игра с вопросами, то показывать экран с вопросами
		if (screen.dataset.view == 'questions') {

			screenGame.dataset.gameType = 'questions';
		// если сегдня игра с парами, то показывать экран с парами
		} else if (screen.dataset.view == 'pairs'){

			screenGame.dataset.gameType = 'pairs';
	        
		}

		// анимация появления игр
		TweenMax.fromTo(gameContent, 1, {x: -gameContentWidth}, {x: 0, ease: Back.easeOut})

	});

	// ф-я  запуска таймера
	function startTimer(duration, display) {
	    var timer = duration, minutes, seconds;
	    setInterval(function () {
	        minutes = parseInt(timer / 60, 10)
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        display.textContent = minutes + ":" + seconds;
	        // если таймер достиг значения меньше 10сек, то подсветить красным
	        if (--timer < 10) {

	        	display.classList.add('task__timer_warning');

	        	// если таймер достиг нуля, то 
	        	if (timer < 0) {
		            //остановить таймер
		            timer = 0;

		            // показать экран со статистикой
		            screenGame.dataset.gameType = 'statistics';

		            TweenMax.fromTo(statistic, 1, {y: -gameContentHeight}, {y: 0, ease: Linear.easeInOut});

		            return
		        }
	        }
	        
	    }, 1000);

	}

	// навешиваем событие на кнопку "я готов!"
	btnStart.addEventListener('click', function(){
		var oneMinutes = 60,
        	display = document.querySelector('.task__timer');

        //запускаем таймер	
    	startTimer(oneMinutes, display);
    	
    	answersPairs.classList.add('answers-pairs_active');
    	btnStart.style.display = 'none';
		TweenMax.fromTo(answersPairs, 1, {x: -gameContentWidth}, {x: 0, ease: Back.easeOut})
	})

})();

// перезагрузить страницу
var reloadPage = (function(){

	var btnReload = document.querySelector('.js__btn_reload');

	btnReload.addEventListener('click', function(){

		location.reload();

	})
})();

// скрыть/показать правила
var showRules = (function(){

    var btns = Array.prototype.slice.call(document.querySelectorAll('.js__rules_content'));

    btns.forEach(function(btn){

        btn.addEventListener('click', function(){

            var rules = btn.querySelector('.js__rules_list');

            if (btn.querySelector('.rules__show')) {

                // Скрываем блок правил
                $(rules).slideUp(400, function () {
                    rules.classList.remove('rules__show');
                });

            } else{

                // Отображем блок правил
                $(rules).slideDown(400, function () {
                    rules.classList.add('rules__show')
                });

            }

        });
    });
    
})();


});