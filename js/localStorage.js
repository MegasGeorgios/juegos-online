/*
*	Guardar registro usuario
*/
function storageRecord(arrJson,game,record)
{
	var userName = sessionStorage.getItem('userName');
	var d = new Date();
	var month = d.getMonth()+1;
	var date = d.getDate()+'-'+month+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
		
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

	if (game == 'bj') 
	{
		let lose = 10-record;
		let success = record+' / '+lose;

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