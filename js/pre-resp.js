(function($) {

/**VARIABLES GLOBALES**/
var fileContent;
var countQt = 1;

/**FUNCIONES**/

/*
*	Obtener mediante ajax las preguntas y respuestas.
*/
function requestData() 
{
	$.ajax({
	    url: "./pre-resp.txt",
	    async: false,
	    success: function (data){
	        fileContent = data;
	    }
	});
}

/*
*	Pintar pregunta con sus opciones de respuesta 
*/
function generateQuestion(arrQtRes, numQt)
{
	var qt = arrQtRes[numQt].split("#"); // la pregunta
	var opt = qt[1].split(","); // las opciones de respuesta
	qt = qt[0];

	console.log(arrQtRes[1]);
	console.log(opt);
	$("#qt").text('¿'+qt); // pintar pregunta

	for (let i=0; i < 4; i++) 
	{
		let str = i+1;
		let selector = '#opt-'+str;
		$(selector).text(opt[i]); // pintar opcion de respuesta
	}
}


/**jQuery**/
$( document ).ready(function() {

	requestData();

	var arrQtRes = fileContent.split("¿");

	// generar primera pregunta
	generateQuestion(arrQtRes, countQt);

	$(".option").unbind().click(function() {



	});
	   
});

})(jQuery);