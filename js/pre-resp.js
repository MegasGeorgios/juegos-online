(function($) {

/**VARIABLES GLOBALES**/
var arrQtResJSON;
var arrQtRes = [];
var countQt = 0;
var success = 0;

/**FUNCIONES**/

/*
*	Obtener mediante ajax las preguntas y respuestas.
*/
function requestDataJSON() 
{
	$.ajax({
		dataType: "json",
	    url: "../assets/ajax/preg-resp.json",
	    async: false,
	    success: function (data){
	        arrQtResJSON = data.arrData;//JSON.parse(data.arrData);
	    }
	});
}

/*
*	Pintar pregunta con sus opciones de respuesta 
*/
function printQuestion(arrQtRes, numQt)
{
	// eliminar clases resp correcta o erronea
	$(".option").removeClass("list-group-item-success");
	$(".option").removeClass("list-group-item-danger");
	$(".option").prop('disabled', false);

	var obj = arrQtRes[numQt]; 
	var qt = obj.qt;	// la preguta
	var opt = obj.opt; // las opciones de respuesta
	opt = randomOrder(opt);
	var optCorrect = obj.optCorrect; //respuesta correcta

	$("#qt").text(qt); // pintar pregunta

	for (let i=0; i < 4; i++) 
	{
		let str = i+1;
		let selector = '#opt-'+str;
		$(selector).text(opt[i]); // pintar opcion de respuesta
	}

	return optCorrect;
}

function randomOrder(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
*	Generar aleatoriamente las 10 preguntas 
*/
function getTenQt()
{
	var arrTenQt = [];
	var arrIndex = [];

	for (let i=0; i < 50; i++) 
	{
		arrIndex.push(i);
	}

	// array de indices aleatorios sin repetir 
	arrIndex = arrIndex.sort(function() {return Math.random() - 0.5});

	for (let i=0; i < 10; i++) 
	{
		arrTenQt.push(arrQtResJSON[arrIndex[i]]);
	}
	
	return arrTenQt;
}

/*
*	Validar si la opt seleccionada es la correcta 
*/
function validateOpt(elem, optCorrect)
{
	elem.removeClass("list-group-item-dark");

	if ( optCorrect == elem.text() ) 
	{
		elem.addClass("list-group-item-success");
		success++;
	}else{
		elem.addClass("list-group-item-danger");
		
		$(".option").each(function( index) 
		{
			if ($(this).text() == optCorrect) 
			{
				$(this).addClass("list-group-item-success");
			}
		});
	}
}

/*
*	Generar indice aleatorio
*/
function getRandomIndex(min, max)
{
  return Math.floor(Math.random() * (max - min)) + min;
}

/**jQuery**/
$( document ).ready(function() {

	requestDataJSON();
	arrQtRes = getTenQt();

	// pintar primera pregunta con sus opciones y obtener respuesta correcta
	var optCorrect = printQuestion(arrQtRes, 0);

	$(".option").unbind().click(function() {

		var elem = $(this);
		// una vez seleccionada una opcion, deshabilitamos el resto
		// y cambiamos el color de fondo de la opcion seleccionada
		$(".option").prop('disabled', true);
		elem.addClass("list-group-item-dark");

		setTimeout(function()
		{	
			// validar respuesta
			validateOpt(elem, optCorrect);

		}, 1000);

		// incrementar contador siguiente pregunta.
		countQt++;

		setTimeout(function()
		{	
			if (countQt < 10)
			{
				// siguiente pregunta
				optCorrect = printQuestion(arrQtRes,countQt);
			}else{
				alert('¡¡¡ Has acertado '+success+' de 10 !!!');
			}

		}, 3000);

		

	});
	   
});

})(jQuery);