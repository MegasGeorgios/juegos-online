(function($) {

/**FUNCIONES**/

/*
*	Pintar datos en las tablas de registros
*/
function printRecords(arrJson, id)
{
	var strEle = '';
	//obtenemos el array con los registros mediante localStorage.
	let records = JSON.parse(localStorage.getItem(arrJson) || "[]");
	let ele = $(id).find('tbody');

	if (records.length == 0) 
	{
		$(id).append("<p class=\"text-center\">No hay registros</p>");

		return;
	}

	// pinitar los registros en la tabla.
	for(var i = 0; i < records.length; i++) 
	{
		let index = i+1;
		// crear filas de la tabla con los registros (usuario, registro, fecha)
	    strEle = "<tr><th scope=\"row\">"+ index +"</th><td>"+ records[i].user +"</td><td>"+ records[i].record +"</td><td>"+ records[i].date +"</td></tr>";
	    ele.append(strEle);
	}
}


/**jQuery**/
$( document ).ready(function() {

	var html = `<div id="memory">
			<h5>Memoria</h5>
			<table class="table table-bordered">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Usuario</th>
			      <th scope="col">Tiempo</th>
			      <th scope="col">Fecha</th>
			    </tr>
			  </thead>
			  <tbody>
			    
			  </tbody>
			</table>
		</div>

		<div id="hangman">
			<h5 class="container-top">El ahorcado</h5>
			<table class="table table-bordered">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Usuario</th>
			      <th scope="col">Fallos / Intentos</th>
			      <th scope="col">Fecha</th>
			    </tr>
			  </thead>
			  <tbody>
			    
			  </tbody>
			</table>
		</div>

		<div id="qt-resp">
			<h5 class="container-top">Preguntas y respuestas</h5>
			<table class="table table-bordered">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Usuario</th>
			      <th scope="col">Aciertos</th>
			      <th scope="col">Fecha</th>
			    </tr>
			  </thead>
			  <tbody>
			    
			  </tbody>
			</table>
		</div>`;

	// creacion de la pagina "registros" mediante el DOM.
	$('.container').append(html);

	// pintar datos en tablas
	printRecords("recordsMemory","#memory");
	printRecords("recordsHangman","#hangman");
	printRecords("recordsQT","#qt-resp");
	
});

})(jQuery);