<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Documento sin título</title>
</head>
<body>
	<h1>Juego del ahorcado</h1>
	<div id="horca">
		<div >
			<img id="resultado" src="" alt="">	
		</div>
		<div class="palabraBuscada">
			<p>Palabra</p>
			<p>_ _ _ _</p>
		</div>
	</div>
<form action="">
<input type="text" name="letras" onsubmit="return ahorcado(this.value)" placeholder="Di una letra">
<input type="submit" value="Enviar">
</form>
<p>Letras dichas</p>
<div id="letrasDadas"></div>
<script src="ahorcado.js"></script>
</body>
</html>


















