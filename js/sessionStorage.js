function setUserName() 
{
	// si ya esta definido el nombre de usuario pintamos el mensaje
	if (sessionStorage.userName != null && typeof(sessionStorage.userName) != 'undefined') 
	{
		document.getElementById("welcome").innerHTML = "Bienvenido " + sessionStorage.userName;

	}else{
		var userName = prompt("Ingresa tu nombre para registrar tu puntuacion en los juegos !!!");

		if (userName != null && userName != '') 
		{
			document.getElementById("welcome").innerHTML = "Bienvenido " + userName;
		}else{

			// si no esta definido el nombre de usuario
			// asignamos uno por defecto con la hora en que ingreso al juego
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

			userName = "user"+time.replace(/:/g, "");

			document.getElementById("welcome").innerHTML = "Bienvenido " + userName;
		}

		sessionStorage.userName = userName;
	}
}

window.onload = setUserName;