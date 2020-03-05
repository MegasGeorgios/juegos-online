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
	var id_aux = '';

	// obtenemos las tarjetas(nombre de las imgs) en un array aleatorio
	var imgsRamdon = randomOrder(imgs);

	// capturamos el evento de la tarjeta en la que se ha hecho click
	$(".img-memory").unbind().click(function() {

		var id = $(this).attr("id");
		var index = $(this).data("index");

		// asignamos a esa tarjeta la img conrrespondiente
		$(this).attr("src", "assets/imgs-memoria/"+imgsRamdon[index]);
		
		if (click == '') 
		{
			click = imgsRamdon[index];
			id_aux = id;
		
		// si son iguales, acerto
		}else if (click == imgsRamdon[index] && id != id_aux) 
		{
			console.log('Acerto');
			click = '';
			id = '';
			id_aux = '';
		}else
		{
			console.log('No acerto');
			var selector1 = '#'+id;
			var selector2 = '#'+id_aux;

			// ocultamos las tarjetas despues de 2 seg
			setTimeout(function(){
				$(selector1).attr("src", "assets/imgs-memoria/default.jpg"); 
				$(selector2).attr("src", "assets/imgs-memoria/default.jpg"); 
			}, 2000);
			
			click = '';
			id = '';
			id_aux = '';
		}
		
	});

});

})(jQuery);