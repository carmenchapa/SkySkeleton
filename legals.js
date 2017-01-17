function createLegals() {
	var labelContainer = document.getElementById('legal-label');
	labelContainer.innerHTML = data.Legal_button_copy;
	labelContainer.addEventListener('click', _handleLabelContainerClick, false);

	var legalTextContainer = document.getElementById('legal');
	legalTextContainer.style.top = document.getElementById('stage').height + 2 + 'px';
	legalTextContainer.style.position = 'relative';
	legalTextContainer.innerHTML = '<p class="legal-copy legal-copy-mobile">' + data.Legal_copy + '</p>';

	var close = document.createElement('div');
	close.setAttribute('id', 'close-button');
	if(data.Legal_copy_close === '' || data.Legal_copy_close === undefined){
		document.querySelector('#legal>p').style.padding  = '5px 25px 5px 5px';
		close.setAttribute('class', 'close-button');
		close.innerHTML = 'X';

	} else {
		document.querySelector('#legal>p').style.padding  = '5px';
		close.setAttribute('class', 'hide-legals');
		close.innerHTML = data.Legal_copy_close;
	}
	document.querySelector('#legal>p').appendChild(close);
	document.getElementById('legal').style.display = 'block';
}

function _handleLabelContainerClick(event) {
	var labelContainer = document.getElementById('legal-label');
	labelContainer.style.opacity = 0;
	labelContainer.removeEventListener('click', _handleLabelContainerClick);
    var distance = document.getElementById('legal').offsetHeight;
    if(document.getElementById('legal').offsetHeight > stage.canvas.height){
        distance = stage.canvas.height - separationLegalTop;
        document.getElementById('legal').style.height = distance + 'px';
		document.getElementById('legal').style.width = document.getElementById('stage').style.width;
		document.getElementById('legal').style.top = document.getElementById('stage').height + 'px';
    }
	TweenMax.to(document.getElementById('legal'), 0.3, {y:'-=' + (distance)});
	document.getElementById('close-button').addEventListener('click', _handleCloseButtonClick, false);
}

function _handleCloseButtonClick(event) {
	var labelContainer = document.getElementById('legal-label');
	labelContainer.style.opacity = 1;
	labelContainer.addEventListener('click', _handleLabelContainerClick, false);
    var distance = document.getElementById('legal').offsetHeight;
    if(document.getElementById('legal').offsetHeight > stage.canvas.height){
        distance = stage.canvas.height - separationLegalTop;
    }
    TweenMax.to(document.getElementById('legal'), 0.3, {y:'+=' + (distance)});
	document.getElementById('legal').style.width = document.getElementById('stage').style.width;
    document.getElementById('close-button').removeEventListener('click', _handleCloseButtonClick);
}
