(function($) {

/**VARIABLES GLOBALES**/
var arrQtRes;
var countQt = 0;

/**FUNCIONES**/

/*
*	Obtener mediante ajax las preguntas y respuestas.
*/
function requestDataJSON() 
{
	console.log('ejecutando funcion');
	$.ajax({
		dataType: "json",
	    url: "../assets/ajax/preg-resp.json",
	    async: false,
	    success: function (data){
	        arrQtRes = data.arrData;//JSON.parse(data.arrData);
	    }
	});
}

/*
*	Pintar pregunta con sus opciones de respuesta 
*/
function printQuestion(numQt)
{
	var obj = arrQtRes[numQt]; 
	var qt = obj.qt;	// la preguta
	var opt = obj.opt; // las opciones de respuesta
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

/*
*	Validar si la opt seleccionada es la correcta 
*/
function validateOpt(elem, optCorrect)
{
	elem.removeClass("list-group-item-dark");

	if ( optCorrect == elem.text() ) 
	{
		elem.addClass("list-group-item-success");
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

/**jQuery**/
$( document ).ready(function() {

	requestDataJSON();

	// pintar primera pregunta con sus opciones y obtener respuesta correcta
	var optCorrect = printQuestion(0);

	$(".option").unbind().click(function() {

		var elem = $(this);
		// una vez seleccionada una opcion, deshabilitamos el resto
		// y cambiamos el color de fondo de la opcion seleccionada
		$(".option").prop('disabled', true);
		elem.addClass("list-group-item-dark");

		setTimeout(function()
		{	
			validateOpt(elem, optCorrect);

		}, 1000);

		// contador siguiente pregunta.
		countQt++;

		

	});
	   
});

})(jQuery);