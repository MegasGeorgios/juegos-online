(function($){

/*
*	Importar/incluir archivo js
*/
$.getScript("../js/localStorage.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
});

/**VARIABLES GLOBALES**/
var arrStr_ = [];

var words = [
	'canguro',
	'ardilla',
	'foca',
	'perro',
	'rana',
	'pinguino',
	'loro',
	'mono',
	'casa',
	'piscina',
	'bosque',
	'parque',
	'ciudad',
	'pais',
	'pueblo',
	'arbol',
	'flor'
];

/**FUNCIONES**/

/*
*	Funcion devuelve string con letras acertadas
*/
function stringWord(wordArr, indexesFound)
{
	for(let i=0; i<indexesFound.length; i++)
	{
		let index = indexesFound[i];
		arrStr_[index]=wordArr[index];
	}
	
	let str = '<p id="str">"';
	str += arrStr_.toString().replace(/,/g, " ");
	str += '"</p>';

	$( "#str" ).remove();

	return str;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


/**jQuery**/
$( document ).ready(function() {

	var fails = 1;
	var attempts = 0;
	var str_ = '<p id="str">"';

	// obtenemos la palabra aleatoriamente
	var indexRamdon = Math.floor(Math.random() * Math.floor(15));
	var word = words[indexRamdon];
	var wordArr = word.split('');

	// inicializamos la palabra con '_' por cada letra
	for (let i=0; i < word.length; i++) 
	{
		str_ += '_'+' ';
		arrStr_.push('_'); 
	}
	str_ += '"</p>';

	$("#word").append(str_);

	$(".submit-letter").click(function() {

		// obtenemos la letra que el usuario inserto
		var letter = $(this).val();
		
		$(this).prop('disabled', true);

		let indexesFound = getAllIndexes(wordArr, letter)

		// si no existe la letra en la palabra aumentamos el contador de fallos
		// y pintamos el ahorcado 
		if (indexesFound.length === 0) 
		{
			fails++;
			$("#img-hangman").attr("src", "../assets/imgs-ahorcado/"+fails+".jpg");
			
			if ( fails === 7 ) 
			{
				$(".submit-letter").prop('disabled', true);
				setTimeout(function(){
					let r = confirm('¡¡¡ Has perdido !!! ¿Quieres intentarlo de nuevo?');

					if (r == true) {
					  window.location.reload();
					} else {
					  window.location.href = "/apps/app-games/";
					}
				}, 1000);
			}
		}else{

			attempts++;

			let totalAttempts = attempts+fails;
			// pintamos la letra acertada y el resto '_' por acertar
			$("#word").append( stringWord(wordArr, indexesFound, arrStr_) );

			if ( arrStr_.indexOf('_') === -1 ) 
			{
				setTimeout(function(){
					alert('¡¡¡ Lo has logrado !!! Intentos: '+ totalAttempts);
					$(".submit-letter").prop('disabled', true);

					storageRecord('recordsHangman','hangman',[attempts,fails]);
				}, 1000);
				
			}
		}


	});
	

});

})(jQuery);