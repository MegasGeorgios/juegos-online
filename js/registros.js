(function($) {

/**FUNCIONES**/

/*
*	Pintar datos en las tablas de registros
*/
function printRecords(arrJson, id)
{
	var strEle = '';
	let records = JSON.parse(localStorage.getItem(arrJson) || "[]");
	let ele = $(id).find('tbody');

	if (records.length == 0) 
	{
		$(id).append("<p class=\"text-center\">No hay registros</p>");

		return;
	}

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

	// pintar datos en tablas
	printRecords("recordsMemory","#memory");
	printRecords("recordsQT","#qt-resp");
	printRecords("recordsBJ","#bj");

});

})(jQuery);