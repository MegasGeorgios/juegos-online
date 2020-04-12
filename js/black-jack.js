(function($){

/*
*	Importar/incluir archivo js
*/
$.getScript("../js/localStorage.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
});

/**VARIABLES GLOBALES**/
var suits = ["PICAS", "CORAZONES", "DIAMANTES", "TREBOL"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; 
var deck = new Array();
var players = new Array();
//var currentPlayer = 0;

/**FUNCIONES**/

/*
*	Crear mazo de barajas
*/
function createDeck()
{
    deck = new Array();
    for (var i = 0 ; i < values.length; i++)
    {
        for(var x = 0; x < suits.length; x++)
        {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = { Value: values[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

/*
*	Barajar el mazo
*/
function shuffle()
{
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

/*
*	Crear 2 jugadores (la casa y 1 jugador)	
*/
function createPlayers()
{
    players = new Array();
    var hand = new Array();
    var player = { Name: sessionStorage.userName, ID: 1, Points: 0, Hand: hand };
    players.push(player);
    var hand = new Array();
    player = { Name: 'La casa', ID: 2, Points: 0, Hand: hand };
    players.push(player);
    
}

/*
* Reparte la mano (2 cartas cada jugador)
*/
function dealHands()
{
    for(var i = 0; i < 2; i++)
    {
        for (var x = 0; x < players.length; x++)
        {
            var card = deck.pop();

            if (card.Value == 'A') 
            {
                card = validateAS(card, x);
            }

            players[x].Hand.push(card);

            updatePoints();
        }
    }

    let src1 = players[0].Hand[0].Value+'-'+players[0].Hand[0].Suit+'.jpg';
    let img1 = '<img class="img-bj" src="../assets/imgs-bj/'+src1+'">';
    $("#card-1").append(img1);

    let src2 = players[0].Hand[1].Value+'-'+players[0].Hand[1].Suit+'.jpg';
    let img2 = '<img class="img-bj" src="../assets/imgs-bj/'+src2+'">';
    $("#card-2").append(img2);

    let src_h_1 = players[1].Hand[0].Value+'-'+players[1].Hand[0].Suit+'.jpg';
    let img_h_1 = '<img class="img-bj" src="../assets/imgs-bj/'+src_h_1+'">';
    $("#card-h-1").append(img_h_1);

    let img_h_2 = '<img class="img-bj card-default" src="../assets/imgs-bj/default.jpg">';
    $("#card-h-2").append(img_h_2);
}

/*
* Obtener puntos de un jugador en su mano
*/
function getPoints(index)
{
    var points = 0;
    for(var i = 0; i < players[index].Hand.length; i++)
    {
        points += players[index].Hand[i].Weight;
    }
    players[index].Points = points;
    return points;
}

/*
*   Actualizar puntaje del jugador y la casa
*/
function updatePoints()
{
    getPoints(0); // jugador
    getPoints(1); // la casa
}

/*
*   Si la carta es A y el user se pasa de 21 cambiar el valor de A a 1
*/
function validateAS(card, currentPlayer)
{ 
    if ( card.Value == 'A' && (players[currentPlayer].Points+11 > 21) ) 
    {
        card.Weight = 1;
    }
    return card;
}

/*
*   Si el usuario pasa de 21 puntos, validar si tiene cartas A con valor 11 y cambiarla por valor 1
*/
function validateOver21(currentPlayer, render = 'user')
{ 
    let hand = players[currentPlayer].Hand;

    for(let i=0; i<hand.length; i++)
    {
        if(hand[i].Value == 'A' && hand[i].Weight == 11)
        {
            players[currentPlayer].Hand[i].Weight = 1;
            let p = getPoints(currentPlayer);
            
            if (render == 'user') 
            {
                renderPoints(p);
            }else
            {
                renderPointsHouse(p);
            }
            
            return p;
        }
    }

    return players[currentPlayer].Points;
}

/*
*	Pedir otra carta del mazo
*/
function hitMe(currentPlayer, render = 'player')
{
    var card = deck.pop();

    if ( card.Value == 'A' ) 
    {
        card = validateAS(card, currentPlayer);
    }

    players[currentPlayer].Hand.push(card);
    renderCard(card, render);
    updatePoints();
}

/*
* Pintar carta
*/
function renderCard(card, render)
{
    let src = card.Value+'-'+card.Suit+'.jpg';
    let img = '<div class="card-bj"><img class="img-bj" src="../assets/imgs-bj/'+src+'"></div>';
    
    if (render == 'player') 
    {
        $("#cards-player").append(img);
    }else
    {
        $("#cards-house").append(img);
    }
    
}

/*
*   Pintar puntuacion 
*/
function renderPoints(pointsUser)
{
    $("#points").remove();
    let str = '<div id="points"><span>Puntos: '+pointsUser+'</span></div>';
    $(".cards-player").append(str);
}
function renderPointsHouse(pointsHouse)
{
    let str = '<span>Puntos: '+pointsHouse+'</span>';
    $("#points-house").addClass('points-house');
    $("#points-house").html(str);
}

/*
* Pintar numero de cartas en el mazo
*/
function renderNumDeck()
{
    $("#deck-length").remove();
    let str = '<span id="deck-length">Barajas: '+ deck.length+'</span>';
    $(".card-bj-deck").append(str);
}


function playHouse(pointsUser) 
{
    let currentPlayer = 1;

    let src_h_2 = players[1].Hand[1].Value+'-'+players[1].Hand[1].Suit+'.jpg';
    $(".card-default").attr("src", "../assets/imgs-bj/"+src_h_2);
    
    if (pointsUser <= 21) 
    {
        for(let i=0; i<10; i++)
        {
            if ( players[1].Points < pointsUser ) 
            {
                hitMe(currentPlayer, 'house');
                validateOver21(currentPlayer, 'house');
            }
        }
    }
    renderNumDeck();
    renderPointsHouse(players[1].Points);
}


/**jQuery**/
$( document ).ready(function() {

    var currentPlayer = 0;
    var pointsUser = 0; 

    // crear el mazo
	createDeck();
    // barajar el mazo
	shuffle();
    // crear los jugadores
	createPlayers();
    // repartir la mano inicial 
	dealHands();

    let str = 'Barajas: '+ deck.length;
    $("#deck-length").append(str);
    str = '<span>Puntos: '+players[currentPlayer].Points+'</span>';
    $("#points").append(str);

	$("#hit").click(function() {

        // otra carta
        hitMe(currentPlayer);
        pointsUser = players[currentPlayer].Points; 

        // pintar nuevo puntaje y numero de barajas restantes en el mazo
        renderNumDeck();    
        renderPoints(pointsUser);

        // validar si se puede convertir el valor de un A (AS) de 11 a 1
        if (pointsUser > 21) 
        {
            pointsUser = validateOver21(currentPlayer);
        }

        if (pointsUser >= 21) 
        {
            $("#hit").prop('disabled', true);
            $("#stand").prop('disabled', true);
            playHouse(pointsUser);    
        }
	});

    $("#stand").click(function() {

        $("#hit").prop('disabled', true);
        $("#stand").prop('disabled', true);
        playHouse(players[0].Points);
    });

});

})(jQuery);