/**
 * 2C = Two of Clubs (Trebol)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas | picas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
    puntosComputadora = 0;
// Referencias HTML
const nuevo = document.querySelector('#btnNuevo');
const pedir = document.querySelector('#btnPedir');
const detener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

const puntosHTML = document.querySelectorAll('small');

// Está función crea un nuevo Deck
const crearDeck = () => {
    // crea primero las cartas numericas
    for( let i = 2; i <= 10; i++){
        for( let tipo of tipos) {
            deck.push( i + tipo);
        }
    }
    // crea las cartas especiales
    for( let tipo of tipos) {
        for( let especial of especiales) {
            deck.push( especial + tipo );
        }
    }

    // _.shuffle() mezcla las cartas o resultados
    deck = _.shuffle( deck )
    console.log( deck );
    return deck;
}

crearDeck()

// Está función me permite tomar una carta
const pedirCarta = () => {
    if( deck.length === 0) {
        throw 'No hay cartas en el Deck'
    }

    let carta = deck.pop();
    // console.log( deck );
    // console.log( carta );
    return carta
}

// pedirCarta()

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1)
    
    return  (isNaN( valor)) ? 
                ( valor === 'A' ? 11 : 10) :
                ( valor * 1);
}

// Turno de computadora
const turnoComputadora = ( puntosMinimo ) => {
    do {
        
        const carta = pedirCarta();
        puntosComputadora += valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        // agregar carta al html
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        divCartasComputadora.append( imgCarta );

        if( puntosMinimo > 21)
            break;

    } while( (puntosComputadora < puntosMinimo) && puntosMinimo <= 21)

    setTimeout(() => {
        if( puntosComputadora === puntosMinimo )
            alert('Nadie gana!')
        else if( puntosMinimo >= 21)
            alert('Computadora gana!')
        else if( puntosComputadora > 21)
            alert('Gana jugador!')
        else
            alert('Computadora gana!')
    }, 20)
}

// Eventos
// Pedir carta
pedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // agregar carta al html
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21) {
        // alert('Lo siento mucho, perdiste!');
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora( puntosJugador )
    } else if( puntosJugador === 21 ){
        // alert('Genial ganaste!');
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora( puntosJugador )
    }
});


detener.addEventListener('click', () => {
    pedir.disabled = true;
    detener.disabled = true;

    turnoComputadora( puntosJugador )
})

nuevo.addEventListener('click', () => {
    console.clear()
    deck = [];
    crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;
    divCartasJugador.innerHTML = ''
    divCartasComputadora.innerHTML = ''

    pedir.disabled = false;
    detener.disabled = false;
})