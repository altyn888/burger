


/*GAMBURGER*/

function gamburger(){


	document.getElementById('gamburger').onclick = function(e){

		e.preventDefault();

		this.classList.toggle('gamburger_active');
		this.classList.toggle('gamburger_visible');

		document.querySelector('.logo').classList.toggle('logo_active');
		document.querySelector('.menu-drop').classList.toggle('menu-drop_active');
		document.querySelector('.header__btn').classList.toggle('header__btn_none');
		document.querySelector('.menu__list').classList.toggle('menu__list_active');
		document.querySelector('.hero__content').classList.toggle('hero__content_active');


		/*classList.toggle -- при клике добавляет, а при повторном клике удаляет класс*/
	}
}

gamburger();







/*PHONE*/


function phone(){

	const phone = document.querySelector('#phone');

	phone.addEventListener('keydown', function(e){

		let isDigit = false;
		let isDash = false;
		let isBackspace = false;
		let isArrow = false;

		if(e.key >= 0 || e.key <= 9){
			isDigit = true;
		}

		if(e.key == '-'){
			isDash = true;
		}

		if(e.key == 'Backspace'){
			isDash = true;
		}

		if(e.key == 'ArrowRight' || e.key == 'ArrowLeft' ){
			isDash = true;
		}


		if(!isDigit && !isDash && !isBackspace && !isArrow) {
			e.preventDefault()
		}

	})
}


phone();




/*ACCORDEON_VERTICAL*/

function vertical_acc(){

	let mass_h = document.querySelectorAll('.team__accordeon-name');

	for(let i=0; i<mass_h.length; i++){
   		mass_h[i].addEventListener('click', active)
   	}   	

   	function active(e){

   		e.preventDefault();

   		var classActive = e.target.parentNode.classList.contains('team__accordeon-block_active');

   		if(!classActive){
   			
			for(let i=0; i<mass_h.length; i++){
	   			mass_h[i].parentNode.classList.remove('team__accordeon-block_active')
	   		}
	   		e.target.parentNode.classList.add('team__accordeon-block_active')

   		}else{
   			e.target.parentNode.classList.remove('team__accordeon-block_active')
   		}

   	}

}

vertical_acc();





/*ACCORDEON_HORIZONTAL*/

function horizontal_acc(){

	let mass_h = document.querySelectorAll('.accordeon-2__box');

	for(let i=0; i<mass_h.length; i++){
   		mass_h[i].addEventListener('click', active)
   	}   	

   	function active(e){

   		e.preventDefault();

   		var classActive = e.target.parentNode.classList.contains('accordeon-2__list_active');

   		if(!classActive){
   			
			for(let i=0; i<mass_h.length; i++){
	   			mass_h[i].parentNode.classList.remove('accordeon-2__list_active')
	   		}
	   		e.target.parentNode.classList.add('accordeon-2__list_active')

   		}else{
   			e.target.parentNode.classList.remove('accordeon-2__list_active')
   		}

   	}

}

horizontal_acc();





/*MODAL REVIEWS*/


function modal_reviews(){


	let modal = document.querySelector('.modal-reviews');
	let span = document.querySelector('.close');

	let el = document.querySelectorAll('.reviews__item');
	let h_modal = document.querySelector('.h_modal');
	let t_modal = document.querySelector('.t_modal');


	for(let i=0; i<el.length; i++){

	   el[i].children[2].onclick = function(){
	      modal.style.display = "flex";


	       let H = el[i].children[0].textContent;
	       let T = el[i].children[1].textContent;

	      h_modal.textContent = H;
	      t_modal.textContent = T;
	   }

	}



	/*ЗАКРЫТИЕ ОКНА*/

	span.onclick = function(){
	   modal.style.display = "none";
	}

	window.onclick = function(e){
	   if(e.target == modal){
	      modal.style.display = "none";
	   }
	}




}

modal_reviews();




/*СЛАЙДЕР*/



function Slider(selector){
	this.target = document.querySelector(selector);
	var list = this.target.querySelector('.slider-list');
	this.countSlides = list.children.length;
	this.currentIndexSlide = 0;
	

	this.target.addEventListener('click', (e)=>{
		var arrows = e.target.closest('[data-vector]');

		if(arrows) {
			e.preventDefault();
			var vector = arrows.dataset.vector;
			this[vector]();
		}
	})

	this.next = function(){
		if(this.currentIndexSlide < this.countSlides -1){
			this.currentIndexSlide++;
			translateSlider(this.currentIndexSlide);
		}
	}

	this.prev = function(){
		if(0 < this.currentIndexSlide){
			this.currentIndexSlide--;
			translateSlider(this.currentIndexSlide);
		}
	}

	function translateSlider(index){
		list.style.transform = `translateX(${-(index * 100)}%)`;
	}
}

const slider_1 = new Slider('#slider_1');






/* FORM */


function form(){

	const myForm = document.querySelector('.form__main');
	const send = document.querySelector('#send-btn');

	

	myForm.addEventListener('submit', e =>{
		e.preventDefault();

		var form_data = new FormData();
		
		form_data.append('name', myForm.elements.name.value);
		form_data.append('phone', myForm.elements.phone.value);
		form_data.append('comment', myForm.elements.comment.value);
		form_data.append('comment', myForm.elements.comment.value);
		


		if(validateForm(myForm)){			

			const xhr = new XMLHttpRequest();
			xhr.responseType = 'json';
			xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.send(form_data);
			xhr.addEventListener('load', ()=>{
				if(xhr.response.status === 1){
					modal_ok(xhr.response.message)
				}else{
					modal_ok(xhr.response.message)
				}
			});
		}

	});

	function validateForm(form){
		let valid = true;


		if(!validateField(form.elements.name)){
			valid = false;
		}

		if(!validateField(form.elements.phone)){
			valid = false;
		}

		if(!validateField(form.elements.street)){
			valid = false;
		}

		if(!validateField(form.elements.home)){
			valid = false;
		}

		return valid;
	}

	function validateField(field){
		if(!field.checkValidity()){
			field.nextElementSibling.textContent = field.validationMessage;

			return false;
		}else{
			field.nextElementSibling.textContent = '';

			return true;
		}
	}

	function modal_ok(event){
		document.querySelector('.reset').click();
		let modal = document.querySelector('.modal-form');
		let span = document.querySelector('.form__close');
		let h_modal = document.querySelector('.modal-form__h').textContent= `${event}`;

		modal.style.display= 'flex';

		span.onclick = function(){
		   modal.style.display = "none";
		}

		window.onclick = function(e){
		   if(e.target == modal){
		      modal.style.display = "none";
		   }
		}
	}
}

form();





function initMap(){

	var markers = [
        {	           
            "lat": 51.143831,
            "lng": 71.3998417,	 
            addres: 'addres №1'          	            
        },

        {	  
            "lat": 51.091141,
            "lng": 71.416824,	
            addres: 'addres №2'           	           
        },

        {	   
            "lat": 51.125442,
            "lng": 71.446217,
            addres: 'addres №3'
        }
    ];



	var map = new google.maps.Map(document.getElementById('map'),{
		center:{lat: 51.1462733, lng:71.4207841},
		zoom: 12.5,
		disableDefaultUI: true,
		styles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#DADADA"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#FFAB3F"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ]
	})

	
	markers.forEach((coords)=>{

		var infowindow = new google.maps.InfoWindow({
			content: coords.addres
		});

		var marker = new google.maps.Marker({
			position:coords,
			map:map,
			animation: google.maps.Animation.BOUNCE,
            icon: '../icon/map-marker.svg',
            title: 'hello'
		})

		marker.addListener('click', function() {
            infowindow.open(map, marker)
        });

		
	})

}


initMap();





function videoPlayer(){
	let video;
	let display;
	let progress;
	const line_1 = document.querySelector('.progress_1'); /*оснавная линия прогресс бара*/

	document.querySelector('#volume').onclick = volume;

	document.querySelector('.icon-play').onclick = play;
	document.querySelector('.icon-volume').onclick = function(){
		let volume_icon = document.querySelector('#volume');

		volume_icon.value = 0;
	}


	video = document.querySelector('#video');
	progress = document.querySelector('#progress');


	video.ontimeupdate = progressUpdate;
	progress.onclick = videoRewind;


    /*play/pause*/

    let box = document.querySelector('#play_pause');
	let pl_pa = document.querySelector('#toogle_el');

	box.onclick = function(){
		if(box.classList == 'box play-box'){
			play();
		}
		else{
			pause();
		}
	}


	function play(){
		box.classList.add('pause-box');
		box.classList.remove('play-box');

		pl_pa.classList.remove('play');
		pl_pa.classList.add('pause');

		video.play();

		document.querySelector('.modal-video').style.display = 'none';
	}

	function pause(){
		box.classList.add('play-box');
		box.classList.remove('pause-box');

		pl_pa.classList.remove('pause');
		pl_pa.classList.add('play');

		video.pause();

		document.querySelector('.modal-video').style.display = 'flex';
	}


	function volume(){
		let v = this.value;
		video.volume = v/100; /*регулируется в %*/
	}


	function progressUpdate(){
		let d = video.duration; /*все время*/ 
		let c = video.currentTime; /*текущее время*/
		let p_value = (100 * c)/d; /*процент значения времени*/

		line_1.style.width = `${p_value}%`
	}


	function videoRewind(e){
		let w = this.offsetWidth; /*получаем всю ширину бара*/
		let o = e.offsetX;		/*получаем ширину до точки, на которую мы кликнули*/ 

		let d = video.duration;

		pause();
		video.currentTime = d *(o/w);
	}

}


videoPlayer();










function onePageScroll(){

	const sections = $('.section');
	const display = $('.mainContent');

	let inScroll = false;

	const perfornTransition = sectionEq =>{

		if(inScroll === false){
			inScroll = true;

			const position = sectionEq * -100;

			sections.eq(sectionEq).addClass("section-active").siblings().removeClass("section-active");

			display.css({
				transform: `translateY(${position}%)`
			});

			setTimeout(() =>{
				$('.pag__point').eq(sectionEq).addClass('pagination-active').siblings().removeClass('pagination-active')
				inScroll = false;
			}, 600);
		}
	};

	var wrap = document.querySelector('.wrapper');

	console.log(wrap.clientHeight);

	if(wrap.clientHeight <= 700){
		inScroll = false;
	}


	const scrollSection = direction =>{

		const activeSection = sections.filter(".section-active");
		const nextSection = activeSection.next();
		const prevSection = activeSection.prev();

		if(nextSection.length && direction === 'next'){
			perfornTransition(nextSection.index());
		}

		if(prevSection.length && direction === 'prev'){
			perfornTransition(prevSection.index());
		}


	}

	$(window).on('wheel', e =>{

		const deltaY = e.originalEvent.deltaY;

		if(deltaY >0){
			scrollSection("next");

		}

		if(deltaY < 0){
			scrollSection("prev");
		}
	});


	/*скорл с помощью клавиш*/

	$(document).on('keydown', e =>{

		const tagName = e.target.tagName.toLowerCase();

		if(tagName != 'input' && tagName != 'textarea'){
			switch(e.keyCode){
				case 38:
				scrollSection('prev');
				break;
				case 40:
				scrollSection('next');
				break;
			}
		}

	});





	$("[data-scroll-to]").on('click', e =>{
		e.preventDefault();

		const $this = $(e.currentTarget);
		const target = $this.attr("data-scroll-to");

		perfornTransition(target);
	});



	/*toucheSwipe*/


	$('body').swipe({
		swipe: (event, direction) =>{
			let scrollDirection;

			if(direction === 'up'){
				scrollDirection = 'next';
			}
			if(direction === 'down'){
				scrollDirection = 'prev';
			}

			scrollSection(scrollDirection);

		}
	});









}



onePageScroll();







