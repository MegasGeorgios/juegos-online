/*
*	Guardar registro usuario
*/
function storageRecord(arrJson,game,record)
{
	var userName = sessionStorage.getItem('userName');
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var hh = d.getHours();
	var mi = d.getMinutes();

	if (day < 10) { day = '0'+day; }
	if (month < 10) { month = '0'+month; }
	if (hh < 10) { hh = '0'+hh; }
	if (mi < 10) { mi = '0'+mi; }

	var date = day+'-'+month+'-'+d.getFullYear()+' '+hh+':'+mi;//+':'+d.getSeconds();
		
	if (game == 'memory') 
	{
		var recordJSON = {
	        user: userName,
	        record: record,
	      	date: date
	    }
	}

	if (game == 'qt-resp') 
	{
		let success = record+' de '+'10';

		var recordJSON = {
	        user: userName,
	        record: success,
	      	date: date
	    }
	}

	if (game == 'hangman') 
	{
		let attempts = record[0];
		let fails = record[1]-1; // -1 por q esta inicializado en 1 
		let totalAttempts = attempts+fails;
		let success = fails+' / '+totalAttempts;

		var recordJSON = {
	        user: userName,
	        record: success,
	      	date: date
	    }
	}

	// obtener el array de json
	let records = JSON.parse(localStorage.getItem(arrJson) || "[]");

	// insertar el nuevo registro en el array
	records.push(recordJSON);

	// guardar el array json en localStorage
	localStorage.setItem(arrJson, JSON.stringify(records));
	
}