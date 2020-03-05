(function($){

/**VARIABLES GLOBALES**/
var imgs = [
	'canguro.jpg',
	'ardilla.jpg',
	'foca.jpg',
	'perro.jpg',
	'rana.jpg',
	'pinguino.jpg',
	'mono.jpg',
	'loro.jpg',
	'rana.jpg',
	'foca.jpg',
	'loro.jpg',
	'canguro.jpg',
	'pinguino.jpg',
	'ardilla.jpg',
	'mono.jpg',
	'perro.jpg'
];

/**FUNCIONES**/


/*
*	Obtener array imgs en orden aleatorio
*/
function randomOrder(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**jQuery**/
$( document ).ready(function() {

	var click = '';
	var imgsRamdon = randomOrder(imgs);
    console.log(imgsRamdon);

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		
		if (click == '') 
		{
			click = imgsRamdon[0];
		
		}else if (click == imgsRamdon[0]) 
		{
			console.log('Acerto');
		}else
		{
			console.log('No acerto');
			click = '';
		}
		
	});

	$("#img-2").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[1]);
		click1 = imgsRamdon[1];

		if (click == '') 
		{
			click = imgsRamdon[1];
		
		}else if (click == imgsRamdon[1]) 
		{
			console.log('Acerto');
		}else
		{
			console.log('No acerto');
			click = '';
		}
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

	$("#img-1").click(function() {
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[0]);
		click1 = imgsRamdon[0];
	});

});

})(jQuery);