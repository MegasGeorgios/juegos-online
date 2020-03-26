estado = 0;
if(estado == 0){
	document.getElementById('resultado').setAttribute('src','img/0.jpg');
}
function ahorcado(letra){
	consulta = new XMLHttpRequest;
	consulta.open('POST', 'palabras.php', true);
	consulta.onreadystatechange = function(){
		if(consulta.readyState == 4 && consulta.status == 400){
		   	estado = consulta.responseText;
			/* estdo sea numero desde 1-7*/
			ruta = 'img/'+estado+'.jpg';
			document.getElementById('resultado').setAttribute('src',ruta);
		   }
		consulta.send();
	}

return false;
}


