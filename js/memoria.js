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


/*
*	Cronometro
*/

// Poner en marcha el cronometro
function startChronometer() 
{
	emp=new Date();
	elcrono=setInterval(timeChron,10);
}

//función del temporizador			
function timeChron() 
{ 
	actual=new Date(); //fecha a cada instante
	//tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
	cro=actual-emp; //milisegundos transcurridos.
	cr=new Date(); //pasamos el num. de milisegundos a objeto fecha.
	cr.setTime(cro); 
	//obtener los distintos formatos de la fecha:
	cs=cr.getMilliseconds(); //milisegundos 
	cs=cs/10; //paso a centésimas de segundo.
	cs=Math.round(cs); //redondear las centésimas
	sg=cr.getSeconds(); //segundos 
	mn=cr.getMinutes(); //minutos 
	ho=cr.getHours()-1; //horas 
	//poner siempre 2 cifras en los números		 
	if (cs<10) {cs="0"+cs;} 
	if (sg<10) {sg="0"+sg;} 
	if (mn<10) {mn="0"+mn;} 
	//llevar resultado al visor.		 
	visor.innerHTML=ho+":"+mn+":"+sg+":"+cs; 
}

// Detener el cronómetro
function stopChronometer() 
{ 
	clearInterval(elcrono); //Detener el crono
}	


/**jQuery**/
$( document ).ready(function() {

	var click = '';
	var id_aux = '';
	var success = 0;
	var cro=0; //estado inicial del cronómetro.

	// iniciar cronometro
	visor=document.getElementById("reloj");
	startChronometer();

	// obtenemos las tarjetas(nombre de las imgs) en un array aleatorio
	var imgsRamdon = randomOrder(imgs);

	// capturamos el evento de la tarjeta en la que se ha hecho click

	$(".img-memory").unbind().click(function() {

		if (success < 8) 
		{
			console.log(success);
			var id = $(this).attr("id");
			var index = $(this).data("index");

			// asignamos a esa tarjeta la img conrrespondiente
			$(this).attr("src", "../assets/imgs-memoria/"+imgsRamdon[index]);
			
			if (click == '') 
			{
				click = imgsRamdon[index];
				id_aux = id;
			
			// si son iguales, acerto
			}else if (click == imgsRamdon[index] && id != id_aux) 
			{
				success++;
				click = '';
				id = '';
				id_aux = '';
			}else
			{
				var selector1 = '#'+id;
				var selector2 = '#'+id_aux;

				// ocultamos las tarjetas despues de 1.5 seg
				setTimeout(function(){
					$(selector1).attr("src", "../assets/imgs-memoria/default.jpg"); 
					$(selector2).attr("src", "../assets/imgs-memoria/default.jpg"); 
				}, 1500);
				
				click = '';
				id = '';
				id_aux = '';
			}

			// detener cronometro al acertar todas (8)
			if (success == 8) 
			{
				stopChronometer();
				setTimeout(function(){
					var finalTime = $("#reloj").text();
					alert('Tiempo total: '+finalTime+' ¡¡¡ Felicitaciones, lo has logrado !!!');
				}, 1000);
			}
		}
	});
	

});

})(jQuery);