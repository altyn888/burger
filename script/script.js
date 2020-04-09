


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

		const data = {
			name: myForm.elements.name.value,
			phone: myForm.elements.phone.value,
			street: myForm.elements.street.value,
			home: myForm.elements.home.value,
			body: myForm.elements.body.value,
			room: myForm.elements.room.value,
			floor: myForm.elements.floor.value,
			comment: myForm.elements.comment.value,
		};

		if(myForm.elements.pay.value == '+'){
			data['pay'] = 'наличка'
		}else{	data['pay'] = 'по карте'}

		if(myForm.elements.call.checked == true){
			data['call'] = 'не перезванивать'
		}else{data['call'] = 'перезвонить'}


		if(validateForm(myForm)){			

			const xhr = new XMLHttpRequest();
			xhr.responseType = 'json';
			xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
			xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
			xhr.send(JSON.stringify(data));
			xhr.addEventListener('load', ()=>{
				console.log(xhr.response);
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







