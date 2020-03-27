


/*для стрелки*/



document.getElementById('menu_').onclick = function(){
	this.classList.toggle('active_');

	document.getElementById('m_b').classList.toggle('active');

	/*classList.toggle -- при клике добавляет, а при повторном клике удаляет класс*/
}
