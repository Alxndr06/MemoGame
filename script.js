//Demande le nom de l'utilisateur
let userName = window.prompt("Bonjour et bienvenue ! Quel est votre nom ?");

//Mon tableau de cartes avant duplication
const cards = [
    'https://picsum.photos/id/237/100/100', 
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];

const gameBoard = document.getElementById('game-board');
let selectedCards = [];
let foundPairs = 0;

function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src= `${CardUrl}`;
    
    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;
}

// Fonction de duplication de tableau
function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
        return arrayDouble;
}

function shuffleArray(arrayToShuffle) {
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random());
        return arrayShuffled; 
}

let timerInterval;
let elapsedTime = 0; // Temps écoulé en secondes

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        displayTime();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function displayTime() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Démarrer le chronomètre dès que le jeu commence, par exemple au premier clic sur une carte
let gameStarted = false;

function onCardClick(e){
    if (!gameStarted) {
        startTimer(); // Démarrer le chronomètre au premier clic
        gameStarted = true;
    }

    const card = e.target.parentElement;
    card.classList.add('flip');

    selectedCards.push(card);
    //On vérifie que deux cards soient séléctionnées
    if(selectedCards.length == 2) {
        //Désactivation des clics pendant 1 seconde pour éviter de jam le jeu.
        gameBoard.classList.add('no-click');
        setTimeout(() => {
            if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                //on a trouvé une paire
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards[0].removeEventListener('click', onCardClick);
                selectedCards[1].removeEventListener('click', onCardClick);
                foundPairs +=1;
                if(foundPairs >= 8){
                    stopTimer(); // Arrêter le chronomètre
                    alert(`Félicitations ${userName}. Vous avez trouvé toutes les paires en ${document.getElementById('timer').textContent}. Bravo !`);
                }
            }
            else{
                //on s'est trompé
                    selectedCards[0].classList.remove("flip");
                    selectedCards[1].classList.remove("flip");
            }
            selectedCards = [];

            //réactivation des clics
            gameBoard.classList.remove('no-click');
        }, 1000)
    }
}

//Mon double tableau.
let allCards = duplicateArray(cards);
//On mélange le tableau
allCards = shuffleArray(allCards);
allCards.forEach(card => {
    const cardHtml = createCard(card);
    gameBoard.appendChild(cardHtml);
})